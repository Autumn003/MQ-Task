"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SendMQPY } from "../dashboard/send-MQPY";
import {
  IconCoinMonero,
  IconDownload,
  IconKey,
  IconRouteSquare,
  IconX,
} from "@tabler/icons-react";

// Main Expandable Card Component
export function ExpandableCard() {
  type CardType = {
    title: string;
    description: string;
    icon: React.JSX.Element;
    color: string;
    component: React.JSX.Element;
  };
  const [active, setActive] = useState<CardType | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: any) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setActive(null);
      }
    }

    if (active) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active]);

  const cards = [
    {
      title: "Send MQPY",
      description: "Transfer MQPY to other users",
      icon: <IconCoinMonero />,
      color:
        "from-neutral-400 to-neutral-500 dark:from-neutral-800 dark:via-neutral-600 dark:to-neutral-800",
      component: <SendMQPY />,
    },
    {
      title: "Recieve",
      description: "Request MQPY from others",
      icon: <IconDownload />,
      color:
        "from-neutral-400 to-neutral-500 dark:from-neutral-800 dark:via-neutral-600 dark:to-neutral-800",
      component: (
        <div className="p-6 text-center text-neutral-600 dark:text-neutral-400">
          Request Payment feature coming soon...
        </div>
      ),
    },
    {
      title: "Bridge",
      description: "View all transactions",
      icon: <IconRouteSquare />,
      color:
        "from-neutral-400 to-neutral-500 dark:from-neutral-800 dark:via-neutral-600 dark:to-neutral-800",
      component: (
        <div className="p-6 text-center text-neutral-600 dark:text-neutral-400">
          Bridge feature coming soon...
        </div>
      ),
    },
    {
      title: "Keys",
      description: "Manage your wallet",
      icon: <IconKey />,
      color:
        "from-neutral-400 to-neutral-500 dark:from-neutral-800 dark:via-neutral-600 dark:to-neutral-800",
      component: (
        <div className="p-6 text-center text-neutral-600 dark:text-neutral-400">
          Wallet key feature coming soon...
        </div>
      ),
    },
  ];

  return (
    <div className="bg-linear-to-br rounded-2xl h-full from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 p-8 inset-shadow-sm dark:inset-shadow-neutral-500 inset-shadow-neutral-300">
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-100 p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 items-center justify-center bg-white dark:bg-neutral-800 rounded-full h-10 w-10 shadow-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors z-50"
              onClick={() => setActive(null)}
            >
              <IconX />
            </motion.button>

            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[600px] max-h-[90vh] flex flex-col bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div
                className={`bg-linear-to-r ${active.color} p-2 flex items-center gap-4 text-white`}
              >
                <motion.div
                  layoutId={`icon-${active.title}-${id}`}
                  className="m-4"
                >
                  {active.icon}
                </motion.div>
                <div>
                  <motion.h3
                    layoutId={`title-${active.title}-${id}`}
                    className="text-3xl font-bold mb-2"
                  >
                    {active.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${active.description}-${id}`}
                    className="text-white/90"
                  >
                    {active.description}
                  </motion.p>
                </div>
              </div>

              <div className="p-6 overflow-auto no-scrollbar">
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 }}
                >
                  {active.component}
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-linear-to-r from-neutral-600 via-neutral-400 to-neutral-600 dark:from-neutral-200 dark:via-neutral-400 dark:to-neutral-200 bg-clip-text text-transparent">
          Quick Actions
        </h1>

        <div className="gap-6">
          {cards.map((card) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={`card-${card.title}-${id}`}
              onClick={() => setActive(card)}
              className="group cursor-pointer"
            >
              <div className="relative bg-white dark:bg-neutral-800 rounded-2xl p-2 my-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 overflow-hidden">
                <div
                  className={`absolute inset-0 bg-linear-to-r from-neutral-800 via-neutral-600 to-neutral-800 opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <motion.div
                      layoutId={`icon-${card.title}-${id}`}
                      className=""
                    >
                      {card.icon}
                    </motion.div>
                    <div>
                      <motion.h3
                        layoutId={`title-${card.title}-${id}`}
                        className="text-xl font-bold text-neutral-800 dark:text-neutral-200 "
                      >
                        {card.title}
                      </motion.h3>

                      <motion.p
                        layoutId={`description-${card.description}-${id}`}
                        className="text-neutral-600 dark:text-neutral-400 text-sm"
                      >
                        {card.description}
                      </motion.p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center text-neutral-500 dark:text-neutral-400 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                    <span className="text-sm font-medium">Open</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
