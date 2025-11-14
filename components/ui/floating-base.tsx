import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { IconAppsFilled } from "@tabler/icons-react";

export const FloatingBase = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
    status: any;
  }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
    status: any;
  }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2 justify-center items-center"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <button
                  onClick={() => {
                    item.onClick();
                    console.log("status neww", item.status);
                  }}
                  key={item.title}
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full backdrop-blur-sm border transition-colors duration-200 ease-in",
                    item.status === "open"
                      ? "bg-sky-500/20 dark:bg-sky-600/30 border-sky-500/30"
                      : "bg-neutral-400/20  dark:bg-neutral-500/20 border-neutral-500/30"
                  )}
                >
                  <div className="h-10 w-10">{item.icon}</div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200/20 dark:bg-neutral-200/10 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] border border-gray-300/30 dark:border-neutral-500/30 transition-colors duration-200 ease-in"
      >
        <IconAppsFilled className="h-8 w-8 text-neutral-300" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; onClick: () => void }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl px-4 pb-3 md:flex ",
        className
      )}
      // className={cn(
      //   "mx-auto hidden h-16 items-end gap-4 rounded-2xl px-4 pb-3 md:flex dark:bg-sky-600/10 bg-sky-300/10 backdrop-blur-sm border dark:border-sky-900/30 border-sky-300/20 ",
      //   className
      // )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  onClick,
  status,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  status?: "open" | "closed";
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <button onClick={onClick} className="outline-none">
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border px-2 py-0.5 text-xs whitespace-pre dark:bg-sky-200/10 backdrop-blur-md dark:border-sky-900/30 bg-sky-200/20 border-sky-300/20"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{
            height: heightIcon,
            filter: hovered
              ? "drop-shadow(0 2px 5px rgba(0, 128, 226, 0.5)) drop-shadow(0 2px 50px rgba(0, 128, 226, 0.3))"
              : "none",
          }}
          className={cn(
            "flex items-center justify-center transition-all duration-200 ease-in",
            status === "open" ? "opacity-100" : "opacity-80"
          )}
        >
          {status === "open" ? (
            <div className="">
              {icon}
              <div className="h-[3.5px] w-4 dark:bg-sky-400/80 bg-sky-300/80 mt-1 mx-auto rounded-full shadow-[0_0_8px_rgba(56,189,248,0.4)] dark:shadow-[0_0_10px_rgba(56,189,248,0.7)]" />
            </div>
          ) : (
            icon
          )}
        </motion.div>
      </motion.div>
    </button>
  );
}
