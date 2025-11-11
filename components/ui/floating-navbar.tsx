"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import ThemeToggler from "./theme-toggler";
import {
  IconMessageChatbot,
  IconSearch,
  IconTerminal2,
  IconUser,
} from "@tabler/icons-react";
import SearchBox from "./search-box";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems?: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (direction < 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
  });

  const handleSearchBtn = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <div className=" px-5">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "flex max-w-xl justify-between mx-auto fixed top-10 inset-x-0 border border-transparent dark:border-white/20 rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-5000 pr-2 pl-4 py-2  items-center space-x-4",
            className
          )}
        >
          <div className="flex items-center justify-around gap-2">
            <Link href="/" className="mr-2">
              <Image
                src="/mq-logo.png"
                alt="MQ"
                width={30}
                height={30}
                className=""
              ></Image>
            </Link>

            <a
              className={cn(
                "text-secondary-foreground/80 items-center flex hover:text-muted-foreground cursor-pointer"
              )}
            >
              <span className="block sm:hidden">
                <IconTerminal2 className="h-6 w-6" />
              </span>
              <span className="hidden sm:block text-sm font-semibold">
                Console
              </span>
            </a>
            <a
              className={cn(
                "text-secondary-foreground/80 items-center flex hover:text-muted-foreground cursor-pointer"
              )}
            >
              <span className="block sm:hidden">
                <IconMessageChatbot className="h-6 w-6 " />
              </span>
              <span className="hidden sm:block text-sm font-semibold">
                Assistant
              </span>
            </a>
          </div>
          <div className="flex items-center justify-around gap-2">
            <ThemeToggler />
            <button className="border flex items-center justify-cente border-neutral-200 dark:border-white/20 p-1.5 rounded-xl shadow-[-2px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] cursor-pointer text-muted-foreground hover:text-secondary-foreground transition-all duration-200 ease-in-out">
              <IconUser className="h-5 w-5 inline-block" />
            </button>

            <button
              onClick={handleSearchBtn}
              className="border-neutral-200 relative dark:border-white/20 flex cursor-pointer items-center justify-center gap-1 rounded-full border p-2 shadow-[-2px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] text-sm text-muted-foreground hover:text-secondary-foreground transition-all duration-200 ease-in-out font-semibold"
            >
              <IconSearch className="h-4 w-4 mt-0.5" />
              <p className="line-clamp-1">Smart Search</p>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-linear-to-r from-transparent via-sky-400 to-transparent h-px" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {isDialogOpen && (
        <div
          className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsDialogOpen(false)}
        />
      )}

      <SearchBox
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        className="fixed top-1/2 left-1/2 z-70 aspect-3/1 w-11/12 max-w-xl -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};
