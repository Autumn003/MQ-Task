"use client";

import React, { useState, useEffect } from "react";
import { IconPlus, IconX } from "@tabler/icons-react";
import { FloatingBase } from "../ui/floating-base";

export function QuickAppsBar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([0, 1, 2, 3]); // Initially show first 4 items

  const allLinks = [
    {
      title: "QMask",
      icon: (
        <img src="/qmask.png" width={100} height={100} alt="Aceternity Logo" />
      ),
      href: "#",
    },
    {
      title: "QShop",
      icon: (
        <img src="/qshop.png" width={100} height={100} alt="Aceternity Logo" />
      ),
      href: "#",
    },
    {
      title: "MQPY",
      icon: (
        <img src="/mqpy.png" width={100} height={100} alt="Aceternity Logo" />
      ),
      href: "#",
    },
    {
      title: "QMail",
      icon: (
        <img src="/qmail.png" width={100} height={100} alt="Aceternity Logo" />
      ),
      href: "#",
    },
    {
      title: "Dev Hub",
      icon: (
        <img src="/devhub.png" width={100} height={100} alt="Aceternity Logo" />
      ),
      href: "#",
    },
    {
      title: "QDeep",
      icon: (
        <img
          src="/spider-logo.png"
          width={100}
          height={100}
          alt="Aceternity Logo"
          className=""
        />
      ),
      href: "#",
    },
    {
      title: "QTrade",
      icon: (
        <img src="/qtrade.png" width={100} height={100} alt="Aceternity Logo" />
      ),
      href: "#",
    },
  ];

  const toggleItem = (index: number) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((i) => i !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  // Get visible links based on selection
  const visibleLinks = selectedItems
    .sort((a, b) => a - b)
    .map((index) => allLinks[index]);

  // Add the "+" button to open dialog with a special href
  const linksWithAddButton = [
    ...visibleLinks,
    {
      title: "Add Apps",
      icon: (
        <IconPlus className="h-full w-full text-neutral-500 dark:text-neutral-300 sm:bg-neutral-800 rounded-full" />
      ),
      href: "#open-dialog",
    },
  ];

  // Listen for clicks on the add button
  useEffect(() => {
    const handleClick = (e: any) => {
      const target = e.target.closest('a[href="#open-dialog"]');
      if (target) {
        e.preventDefault();
        setIsDialogOpen(true);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <div className="flex items-center justify-center w-fit">
        <FloatingBase mobileClassName="" items={linksWithAddButton} />
      </div>

      {/* Dialog/Modal */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center mt-16 justify-center bg-black/50 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsDialogOpen(false);
            }
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
              {allLinks.map((link, index) => {
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

                    {/* Toggle Button */}
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
