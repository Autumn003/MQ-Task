"use client";

import React, { useMemo, useState } from "react";
import { IconPlus, IconX } from "@tabler/icons-react";
import { FloatingBase } from "../ui/floating-base";
import { AnimatePresence, motion } from "motion/react";

export function QuickAppsBar({
  apps,
  onLaunch,
  onToggleMinimize,
  onClose,
}: {
  apps: any[];
  onLaunch: (i: number) => void;
  onToggleMinimize: (i: number) => void;
  onClose: (i: number) => void;
}) {
  // local UI state only (which apps are shown in dock + dialog)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([0, 1, 2, 3]);

  // Ensure open apps are visible in dock even if not toggled on in settings
  const visibleIndices = useMemo(() => {
    const openIndexes = apps
      .map((a, idx) => (a.status === "open" ? idx : null))
      .filter((i): i is number => i !== null);
    return Array.from(new Set([...selectedItems, ...openIndexes])).sort(
      (a, b) => a - b
    );
  }, [apps, selectedItems]);

  const toggleItem = (index: number) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleIconClick = (index: number) => {
    const app = apps[index];
    if (!app) return;

    if (app.status === "closed") {
      // open
      onLaunch(index);
    } else {
      // toggle minimized (dock controls minimize)
      onToggleMinimize(index);
    }
  };

  const visibleLinks = visibleIndices.map((index) => {
    const app = apps[index] ?? { title: "Unknown", icon: <div /> };
    return {
      title: app.title,
      icon: app.icon,
      status: app.status,
      minimized: app.minimized,
      onClick: () => handleIconClick(index),
      onClose: () => onClose(index),
    };
  });

  const linksWithAddButton = [
    ...visibleLinks,
    {
      title: "Add Apps",
      icon: (
        <div className="h-10 w-10 flex items-center justify-center bg-neutral-400/20 dark:bg-neutral-500/40 backdrop-blur-sm rounded-full">
          <IconPlus className="h-8 w-8 text-neutral-500 dark:text-neutral-300" />
        </div>
      ),
      onClick: () => setIsDialogOpen(true),
      status: "closed",
      minimized: false,
      onClose: undefined,
    },
  ];

  return (
    <div className="flex items-center justify-center z-50">
      <AnimatePresence mode="wait">
        {!isDialogOpen ? (
          <motion.div
            key="dock"
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(8px)" }}
            transition={{
              duration: 0.3,
              ease: [0.34, 1.56, 0.64, 1],
              filter: { duration: 0.3 },
            }}
            className="md:dark:bg-black/10 md:bg-white/10 md:backdrop-blur-lg md:border dark:border-white/20 rounded-2xl md:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] "
          >
            <FloatingBase mobileClassName="" items={linksWithAddButton} />
          </motion.div>
        ) : (
          <motion.div
            key="dialog"
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.9,
              rotateX: 10,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: 50,
              rotateX: -5,
              filter: "blur(8px)",
            }}
            transition={{
              duration: 0.4,
              ease: [0.34, 1.56, 0.64, 1],
              filter: { duration: 0.3 },
            }}
            style={{ perspective: 1000 }}
            className="dark:bg-black/10 bg-white/10 backdrop-blur-lg border dark:border-white/20 rounded-2xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsDialogOpen(false);
            }}
          >
            <div className="w-80 max-w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  Manage Quick Apps
                </h2>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="border flex items-center justify-cente border-neutral-200 dark:border-white/20 p-1 rounded-[12px] shadow-[-2px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] cursor-pointer text-muted-foreground hover:text-secondary-foreground transition-all duration-200 ease-in-out"
                >
                  <IconX className="h-5 w-5" />
                </button>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Select apps to show in your dock
              </p>

              <div className="space-y-2 max-h-52 overflow-y-auto custom-scrollbar">
                {apps.map((link, index) => {
                  const isSelected = selectedItems.includes(index);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.03,
                        duration: 0.25,
                        ease: "easeOut",
                      }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-400/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 flex items-center justify-center">
                          {link.icon}
                        </div>
                        <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                          {link.title}
                        </span>
                      </div>

                      {/* Toggle Switch */}
                      <button
                        onClick={() => toggleItem(index)}
                        className="relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 outline-none dark:bg-neutral-900 bg-neutral-300 shadow-inner dark:shadow-neutral-700 shadow-neutral-100"
                        role="switch"
                        aria-checked={isSelected}
                        aria-label={`Toggle ${link.title}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full z-10 bg-neutral-500/80 backdrop-blur-2xl dark:bg-neutral-700 shadow-inner dark:shadow-neutral-500 shadow-neutral-300 transition-transform duration-300 ${
                            isSelected ? "translate-x-7" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  className="px-4 py-1.5 rounded-xl bg-neutral-300/10 backdrop-blur-md dark:bg-neutral-800 dark:shadow-inner dark:shadow-neutral-700 shadow-neutral-100 cursor-pointer border dark:border-neutral-600/50 hover:scale-105 transition-all text-muted-foreground hover:text-secondary-foreground duration-300 font-medium border-neutral-200 shadow-[-2px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
