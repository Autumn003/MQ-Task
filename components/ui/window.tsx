"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "motion/react";
import { Maximize2, Minimize2, Minus, X } from "lucide-react";

export function Window({
  title,
  children,
  defaultWidth = 600,
  defaultHeight = 400,
  defaultX = 100,
  defaultY = 100,
  onClose,
  onMinimize,
}: {
  title: string;
  children: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultX?: number;
  defaultY?: number;
  onClose?: () => void;
  onMinimize?: () => void;
}) {
  const x = useSpring(defaultX, { stiffness: 300, damping: 30 });
  const y = useSpring(defaultY, { stiffness: 300, damping: 30 });
  const width = useSpring(defaultWidth, { stiffness: 260, damping: 30 });
  const height = useSpring(defaultHeight, { stiffness: 260, damping: 30 });

  const containerRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);

  const prev = useRef({
    x: defaultX,
    y: defaultY,
    width: defaultWidth,
    height: defaultHeight,
  });

  // clamp to screen on resize
  const clampToScreen = () => {
    const w = width.get();
    const h = height.get();

    width.set(Math.min(w, window.innerWidth));
    height.set(Math.min(h, window.innerHeight));

    x.set(Math.min(Math.max(x.get(), 0), window.innerWidth - w));
    y.set(Math.min(Math.max(y.get(), 0), window.innerHeight - h));
  };

  useEffect(() => {
    const handleResize = () => clampToScreen();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMaximize = () => {
    if (!isMaximized) {
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
    } else {
      x.set(prev.current.x);
      y.set(prev.current.y);
      width.set(prev.current.width);
      height.set(prev.current.height);

      setIsMaximized(false);
    }
  };

  // RESIZE
  const startResize = (direction: string) => (e: any) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;

    const startW = width.get();
    const startH = height.get();
    const startXPos = x.get();
    const startYPos = y.get();

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;

      if (direction.includes("e")) width.set(Math.max(350, startW + dx));
      if (direction.includes("s")) height.set(Math.max(200, startH + dy));

      if (direction.includes("w")) {
        width.set(Math.max(350, startW - dx));
        x.set(startXPos + dx);
      }
      if (direction.includes("n")) {
        height.set(Math.max(200, startH - dy));
        y.set(startYPos + dy);
      }

      clampToScreen();
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-40">
      <motion.div
        className="absolute bg-white border shadow-xl rounded-lg flex flex-col overflow-hidden pointer-events-auto"
        drag={!isMaximized}
        dragConstraints={containerRef}
        dragMomentum={false}
        dragElastic={0}
        style={{ x, y, width, height }}
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ layout: { duration: 0.2, ease: "easeOut" } }}
      >
        {/* TITLE BAR */}
        <motion.div
          className="bg-blue-600 px-4 py-2 flex items-center justify-between text-white cursor-move"
          whileHover={{ backgroundColor: "rgb(37 99 235)" }}
        >
          <span className="font-medium text-sm">{title}</span>

          <div className="flex items-center gap-1">
            <motion.button
              onClick={handleMaximize}
              className="p-1 rounded hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
            >
              {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </motion.button>
            <motion.button
              onClick={onMinimize}
              className="p-1 rounded hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
            >
              <Minus size={16} />
            </motion.button>

            {onClose && (
              <motion.button
                onClick={onClose}
                className="p-1 rounded hover:bg-red-600"
                whileHover={{ scale: 1.05 }}
              >
                <X size={16} />
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* CONTENT */}
        <div className="flex-1 overflow-auto p-4 bg-gray-50">{children}</div>

        {/* RESIZE HANDLES */}
        {!isMaximized && (
          <>
            <div
              className="absolute left-0 top-0 w-2 h-full cursor-w-resize"
              onMouseDown={startResize("w")}
            />
            <div
              className="absolute right-0 top-0 w-2 h-full cursor-e-resize"
              onMouseDown={startResize("e")}
            />
            <div
              className="absolute top-0 left-0 w-full h-2 cursor-n-resize"
              onMouseDown={startResize("n")}
            />
            <div
              className="absolute bottom-0 left-0 w-full h-2 cursor-s-resize"
              onMouseDown={startResize("s")}
            />

            <div
              className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize"
              onMouseDown={startResize("nw")}
            />
            <div
              className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize"
              onMouseDown={startResize("ne")}
            />
            <div
              className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize"
              onMouseDown={startResize("sw")}
            />
            <div
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
              onMouseDown={startResize("se")}
            />
          </>
        )}
      </motion.div>
    </div>
  );
}
