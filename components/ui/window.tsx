"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { animate } from "motion";
import {
  IconMaximize,
  IconMinimize,
  IconMinus,
  IconX,
} from "@tabler/icons-react";

let topZIndex = 50; // ⭐ GLOBAL Z-INDEX COUNTER

type WindowProps = {
  title: string;
  children: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultX?: number;
  defaultY?: number;
  onClose?: () => void;
  onMinimize?: () => void;
};

export function Window({
  title,
  children,
  defaultWidth = 600,
  defaultHeight = 400,
  defaultX = 0,
  defaultY = 0,
  onClose,
  onMinimize,
}: WindowProps) {
  // motion values for stable instant resizing
  const x = useMotionValue(defaultX);
  const y = useMotionValue(defaultY);
  const width = useMotionValue(defaultWidth);
  const height = useMotionValue(defaultHeight);

  const containerRef = useRef(null);

  const [zIndex, setZIndex] = useState(() => ++topZIndex); // ⭐ Bring new window to front
  const bringToFront = () => {
    topZIndex++;
    setZIndex(topZIndex);
  };

  const [isMaximized, setIsMaximized] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const prev = useRef({
    x: defaultX,
    y: defaultY,
    width: defaultWidth,
    height: defaultHeight,
  });

  const isSmallScreen = () => window.innerWidth < 640;

  const clampToScreen = () => {
    const w = width.get();
    const h = height.get();

    width.set(Math.min(w, window.innerWidth));
    height.set(Math.min(h, window.innerHeight));

    x.set(Math.min(Math.max(x.get(), 0), window.innerWidth - w));
    y.set(Math.min(Math.max(y.get(), 0), window.innerHeight - h));
  };

  useEffect(() => {
    if (isSmallScreen()) {
      prev.current = {
        x: x.get(),
        y: y.get(),
        width: width.get(),
        height: height.get(),
      };

      x.set(0);
      y.set(0);
      width.set(window.innerWidth);
      height.set(window.innerHeight);
      setIsMaximized(true);
    }
  }, []);

  useEffect(() => {
    const resize = () => {
      if (isSmallScreen() && !isMaximized) {
        prev.current = {
          x: x.get(),
          y: y.get(),
          width: width.get(),
          height: height.get(),
        };
        animate(x, 0, { duration: 0.35, ease: "easeOut" });
        animate(y, 0, { duration: 0.35, ease: "easeOut" });
        animate(width, window.innerWidth, { duration: 0.35, ease: "easeOut" });
        animate(height, window.innerHeight, {
          duration: 0.35,
          ease: "easeOut",
        });
        setIsMaximized(true);
      } else {
        clampToScreen();
      }
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [isMaximized]);

  const handleMaximize = () => {
    if (!isMaximized) {
      prev.current = {
        x: x.get(),
        y: y.get(),
        width: width.get(),
        height: height.get(),
      };

      animate(x, 0, { duration: 0.35, ease: "easeOut" });
      animate(y, 0, { duration: 0.35, ease: "easeOut" });
      animate(width, window.innerWidth, { duration: 0.35, ease: "easeOut" });
      animate(height, window.innerHeight, { duration: 0.35, ease: "easeOut" });

      setIsMaximized(true);
    } else {
      if (isSmallScreen()) return;

      animate(x, prev.current.x, { duration: 0.35, ease: "easeOut" });
      animate(y, prev.current.y, { duration: 0.35, ease: "easeOut" });
      animate(width, prev.current.width, { duration: 0.35, ease: "easeOut" });
      animate(height, prev.current.height, {
        duration: 0.35,
        ease: "easeOut",
      });

      setIsMaximized(false);
    }
  };

  const startResize =
    (dir: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setIsResizing(true);

      const startX = e.clientX;
      const startY = e.clientY;

      const startW = width.get();
      const startH = height.get();
      const startXP = x.get();
      const startYP = y.get();

      const move = (ev: MouseEvent) => {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;

        if (dir.includes("e")) width.set(Math.max(350, startW + dx));
        if (dir.includes("s")) height.set(Math.max(200, startH + dy));

        if (dir.includes("w")) {
          const newWidth = Math.max(350, startW - dx);
          width.set(newWidth);
          x.set(startXP + (startW - newWidth));
        }

        if (dir.includes("n")) {
          const newHeight = Math.max(200, startH - dy);
          height.set(newHeight);
          y.set(startYP + (startH - newHeight));
        }

        clampToScreen();
      };

      const up = () => {
        setIsResizing(false);
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
      };

      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    };

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-40">
      <motion.div
        onMouseDown={bringToFront} // ⭐ CLICK BRINGS WINDOW TO FRONT
        className={cn(
          "absolute bg-secondary border shadow-xl rounded-2xl flex flex-col overflow-hidden pointer-events-auto",
          isMaximized
            ? "border-0 rounded-none"
            : "border-secondary-foreground/10"
        )}
        drag={!isMaximized && !isResizing}
        dragConstraints={containerRef}
        dragMomentum={false}
        dragElastic={0}
        style={{ x, y, width, height, zIndex }} // ⭐ APPLY Z-INDEX
        initial={{
          opacity: 0,
          scale: 0.75,
          filter: "blur(8px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          transition: {
            duration: 0.38,
            ease: [0.19, 1, 0.22, 1],
          },
        }}
        exit={{
          opacity: 0.2,
          scale: 0.6,
          y: "110%",
          x: "52%",
          filter: "blur(10px)",
          transition: {
            duration: 0.32,
            ease: [0.4, 0, 0.2, 1],
          },
        }}
      >
        {/* TITLE BAR */}
        <motion.div className="bg-neutral-300 dark:bg-neutral-700 px-4 py-2 flex items-center justify-between text-secondary-foreground select-none">
          <div className="flex gap-2">
            <span className="h-3 w-3 bg-red-400 rounded-full block" />
            <span className="h-3 w-3 bg-yellow-400 rounded-full  block" />
            <span className="h-3 w-3 bg-green-400 rounded-full  block" />
          </div>
          <span className="font-medium text-sm text-muted-foreground">
            {title}
          </span>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={handleMaximize}
              className="p-1.5 rounded-lg dark:bg-neutral-700 bg-neutral-400 cursor-pointer shadow-inner dark:shadow-neutral-500/70  shadow-neutral-200/70 dark:hover:bg-neutral-600 dark:hover:shadow-neutral-800 transition-all flex items-center justify-center hover:bg-neutral-300 hover:shadow-neutral-500 hover:drop-shadow-[0_0_8px_rgba(107,114,128,0.6)] dark:hover:text-neutral-300 hover:text-neutral-600"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2, ease: "easeInOut" },
              }}
            >
              {isMaximized ? (
                <IconMinimize size={14} />
              ) : (
                <IconMaximize size={14} />
              )}
            </motion.button>

            <motion.button
              onClick={onMinimize}
              className="p-1.5 rounded-lg dark:bg-neutral-700 bg-neutral-400 cursor-pointer shadow-inner dark:shadow-neutral-500/70  shadow-neutral-200/70 dark:hover:bg-neutral-600 dark:hover:shadow-neutral-800 transition-all flex items-center justify-center hover:bg-neutral-300 hover:shadow-neutral-500 hover:drop-shadow-[0_0_8px_rgba(107,114,128,0.6)] dark:hover:text-neutral-300 hover:text-neutral-600"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2, ease: "easeInOut" },
              }}
            >
              <IconMinus size={14} />
            </motion.button>

            {onClose && (
              <motion.button
                onClick={onClose}
                className="p-1.5 rounded-lg dark:bg-red-500/50 bg-red-400/80 cursor-pointer shadow-inner dark:shadow-red-300/60 shadow-red-200/70 dark:hover:bg-red-400 dark:hover:shadow-red-700 transition-all flex items-center justify-center hover:bg-red-300 hover:shadow-red-400 hover:drop-shadow-[0_0_8px_rgba(181,38,49,0.6)] hover:text-red-500 text-red-700 dark:text-red-400 dark:hover:text-red-600 "
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2, ease: "easeInOut" },
                }}
              >
                <IconX size={14} />
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* CONTENT */}
        <div className="flex-1 overflow-auto p-4 bg-accent relative">
          <div className="absolute inset-0 bg-[url(https://grainy-gradients.vercel.app/noise.svg)] dark:opacity-18 opacity-30 contrast-150 pointer-events-none" />
          {children}
        </div>

        {/* RESIZE HANDLES */}
        {!isMaximized && (
          <>
            {/* SIDES */}
            <div
              className="absolute left-0 top-0 w-2 h-full cursor-w-resize pointer-events-auto"
              onMouseDown={startResize("w")}
            />

            <div
              className="absolute right-0 top-0 w-2 h-full cursor-e-resize pointer-events-auto"
              onMouseDown={startResize("e")}
            />

            <div
              className="absolute top-0 left-0 w-full h-2 cursor-n-resize pointer-events-auto"
              onMouseDown={startResize("n")}
            />

            <div
              className="absolute bottom-0 left-0 w-full h-2 cursor-s-resize pointer-events-auto"
              onMouseDown={startResize("s")}
            />

            {/* CORNERS */}
            <div
              className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize pointer-events-auto"
              onMouseDown={startResize("nw")}
            />

            <div
              className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize pointer-events-auto"
              onMouseDown={startResize("ne")}
            />

            <div
              className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize pointer-events-auto"
              onMouseDown={startResize("sw")}
            />

            <div
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize pointer-events-auto"
              onMouseDown={startResize("se")}
            />
          </>
        )}
      </motion.div>
    </div>
  );
}
