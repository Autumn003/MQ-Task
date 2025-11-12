"use client";

import React, { useState, useEffect } from "react";
import { IconPlus, IconX } from "@tabler/icons-react";
import { FloatingBase } from "../ui/floating-base";

export function QuickAppsBar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([0, 1, 2, 3]);
  const [links, setLinks] = useState(() => [
    {
      title: "QMask",
      icon: <img src="/qmask.png" width={100} height={100} alt="QMask Logo" />,
      status: "closed",
      minimized: true,
    },
    {
      title: "QShop",
      icon: <img src="/qshop.png" width={100} height={100} alt="QShop Logo" />,
      status: "closed",
      minimized: true,
    },
    {
      title: "MQPY",
      icon: <img src="/mqpy.png" width={100} height={100} alt="MQPY Logo" />,
      status: "closed",
      minimized: true,
    },
    {
      title: "QMail",
      icon: <img src="/qmail.png" width={100} height={100} alt="QMail Logo" />,
      status: "closed",
      minimized: true,
    },
    {
      title: "Dev Hub",
      icon: (
        <img src="/devhub.png" width={100} height={100} alt="Dev Hub Logo" />
      ),
      status: "closed",
      minimized: true,
    },
    {
      title: "QDeep",
      icon: (
        <img src="/spider-logo.png" width={100} height={100} alt="QDeep Logo" />
      ),
      status: "closed",
      minimized: true,
    },
    {
      title: "QTrade",
      icon: (
        <img src="/qtrade.png" width={100} height={100} alt="QTrade Logo" />
      ),
      status: "closed",
      minimized: true,
    },
  ]);

  // Always include open apps
  useEffect(() => {
    const openIndexes = links
      .map((link, index) => (link.status === "open" ? index : null))
      .filter((i): i is number => i !== null);
    setSelectedItems((prev) => Array.from(new Set([...prev, ...openIndexes])));
  }, [links]);

  // Apps click handler
  const handleIconClick = (index: number) => {
    const current = links[index];

    if (current.status === "closed") {
      // First open: unminimize it
      console.log(`Opening ${current.title}...`);
      setTimeout(() => {
        setLinks((prev) =>
          prev.map((item, i) =>
            i === index ? { ...item, status: "open", minimized: false } : item
          )
        );
        console.log(
          `${current.title} is now open (minimized: ${current.minimized}).`
        );
      }, 1000);
      setTimeout(() => {
        console.log("minimized settttt: ", current.minimized);
      }, 2000);
    } else if (current.status === "open") {
      // Already open → toggle minimized
      console.log(`Toggling ${current.title} minimized state...`);
      setTimeout(() => {
        setLinks((prev) =>
          prev.map((item, i) =>
            i === index ? { ...item, minimized: !item.minimized } : item
          )
        );
        console.log(
          `${current.title} minimized state toggled to: ${!current.minimized}`
        );
      }, 1000);
    }
  };

  const toggleItem = (index: number) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((i) => i !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  // Build visible apps
  const visibleLinks = selectedItems
    .sort((a, b) => a - b)
    .map((index) => ({
      ...links[index],
      onClick: () => handleIconClick(index),
    }));

  // Add “Add Apps” button
  const linksWithAddButton = [
    ...visibleLinks,
    {
      title: "Add Apps",
      icon: (
        <IconPlus className="h-full w-full text-neutral-500 dark:text-neutral-300 sm:bg-neutral-800 rounded-full" />
      ),
      onClick: () => setIsDialogOpen(true),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-center w-fit">
        <FloatingBase mobileClassName="" items={linksWithAddButton} />
      </div>

      {/* Dialog */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center mt-16 justify-center bg-black/50 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsDialogOpen(false);
          }}
        >
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                Manage Quick Apps
              </h2>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              Select apps to show in your dock
            </p>

            <div className="space-y-2 max-h-52 overflow-y-auto custom-scrollbar">
              {links.map((link, index) => {
                const isSelected = selectedItems.includes(index);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
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
                      className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 ${
                        isSelected
                          ? "bg-sky-500 focus:ring-sky-400"
                          : "bg-neutral-600 dark:bg-neutral-700 focus:ring-neutral-400"
                      }`}
                      role="switch"
                      aria-checked={isSelected}
                      aria-label={`Toggle ${link.title}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                          isSelected ? "translate-x-7" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
