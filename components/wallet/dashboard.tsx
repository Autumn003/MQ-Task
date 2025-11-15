"use client";

import { useState } from "react";
import { WobbleCard } from "../ui/card";
import { Check, Copy } from "lucide-react";
import { motion } from "motion/react";
import {
  IconDownload,
  IconKey,
  IconRouteSquare2,
  IconSend,
} from "@tabler/icons-react";

const MQPY_rate = 0.3;

// Sample user data
const user = {
  balance: 12500,
  totalMQPY: "12,500.00",
  receiveAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb4",
};

export const Dashboard = () => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(user.receiveAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-1 h-full min-w-0">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900 overflow-y-auto">
        <div className="grid grid-cols-3 grid-rows-12 gap-6">
          <div className="col-span-3">
            <div className="w-full h-full pt-10">
              <div className="bg-white h-full w-full"></div>
            </div>
          </div>
          <div className="col-span-2 row-span-3 row-start-2">
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px]"
              className=""
            >
              <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-12">
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                    Account Overview
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="group relative px-3 py-1 rounded-full bg-linear-to-r from-amber-400/50 to-amber-600/50 border border-amber-500/30 backdrop-blur-sm hover:border-amber-400/50 transition-all duration-300 shadow-inner dark:shadow-amber-300/70 shadow-amber-200/70">
                      <span className="text-amber-300 font-semibold text-sm">
                        Golden
                      </span>
                      <div className="absolute inset-0 rounded-full bg-amber-500/10 blur-xl group-hover:bg-amber-500/20 transition-all duration-300" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-linear-to-r from-neutral-500/10 to-neutral-500/10 border border-neutral-500/30 backdrop-blur-sm hover:border-neutral-400/50 transition-all duration-300 dark:bg-neutral-700 bg-neutral-400 shadow-inner dark:shadow-neutral-500/70 shadow-neutral-200/70">
                      <span className="text-neutral-300 font-semibold text-sm">
                        {user.balance}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main Balance Card */}
                <div className="relative overflow-hidden rounded-3xl bg-linear-to-br dark:from-neutral-800/10 dark:to-neutral-900/10 from-neutral-300/50 to-neutral-400/50 border border-neutral-700/50 backdrop-blur-xl p-8 mb-8 hover:border-neutral-600/50 transition-all duration-300 group shadow-inner dark:shadow-neutral-300/70 shadow-neutral-100">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-linear-to-r from-neutral-500/5 via-neutral-500/5 to-neutral-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <p className="text-neutral-400 text-sm md:text-base font-medium mb-3 flex items-center gap-2">
                      Total MQPY
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </p>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-linear-to-r from-neutral-400 via-neutral-400 to-neutral-400 bg-clip-text text-transparent mb-2">
                      {user.totalMQPY}
                    </h2>
                    <p className="text-neutral-500 text-sm">
                      {Number(user.balance) * MQPY_rate} USD
                    </p>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-neutral-500/20 rounded-full blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-neutral-500/20 rounded-full blur-3xl" />
                </div>

                {/* Receive Address Card */}
                <div className="relative overflow-hidden rounded-3xl bg-linear-to-br dark:from-neutral-800/10 dark:to-neutral-900/10 from-neutral-300/50 to-neutral-400/50 border border-neutral-700/50 backdrop-blur-xl p-8 mb-8 hover:border-neutral-600/50 transition-all duration-300 group shadow-inner dark:shadow-neutral-300/70 shadow-neutral-100">
                  <div className="flex flex-col sm:flex-row sm:items-end-safe justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-neutral-400 text-sm font-medium mb-2">
                        Receive Address
                      </p>
                      <p className="dark:text-neutral-200 text-neutral-700 font-mono text-xs sm:text-sm break-all dark:bg-neutral-950/50 bg-neutral-100/50 px-4 py-3 rounded-xl border">
                        {user.receiveAddress}
                      </p>
                    </div>
                    <button
                      onClick={handleCopy}
                      className="group relative px-6 py-3 rounded-xl bg-linear-to-r dark:from-neutral-800 dark:to-neutral-900 dark:hover:from-neutral-700 dark:hover:to-neutral-800  from-neutral-400 to-neutral-500 hover:from-neutral-500 hover:to-neutral-600   transition-all duration-300 font-semibold text-white shadow-lg shadow-neutral-500/25 hover:shadow-neutral-500/40 hover:scale-105 flex items-center gap-2 whitespace-nowrap inset-shadow-sm dark:inset-shadow-neutral-300/70 inset-shadow-neutral-100"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Address
                        </>
                      )}
                      <div className="absolute inset-0 rounded-xl bg-linear-to-r from-neutral-400 to-neutral-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
                    </button>
                  </div>
                </div>
                {/* Background Image */}
                <img
                  src="/qmask.png"
                  width={500}
                  height={500}
                  alt="background decoration"
                  className="absolute -right-40 -bottom-40 opacity-5 grayscale filter object-contain rounded-2xl pointer-events-none"
                />
              </div>
            </WobbleCard>
          </div>
          <div className="row-span-2 col-start-3 row-start-2">
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px] bg-neutral-950"
              className="py-10 shadow-[0_0_20px_10px_rgba(0,0,0,0.3)_inset]"
            >
              <div className="max-w-xs w-full space-y-5">
                <h4
                  className="
      text-xl md:text-2xl lg:text-3xl font-semibold 
      bg-linear-to-r from-neutral-400 via-neutral-200 to-neutral-400 
      bg-clip-text text-transparent text-center tracking-wide
      drop-shadow-sm
    "
                >
                  Quick Actions
                </h4>

                <div className="space-y-3">
                  {[
                    { label: "Send", icon: <IconSend size={20} /> },
                    { label: "Receive", icon: <IconDownload size={20} /> },
                    { label: "Bridge", icon: <IconRouteSquare2 size={20} /> },
                    { label: "Key", icon: <IconKey size={20} /> },
                  ].map((item, index) => (
                    <motion.button
                      key={index}
                      onClick={() => console.log(item.label)}
                      whileHover={{
                        scale: 1.05,
                        rotate: -0.4,
                        boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                        transition: { duration: 0.2 },
                      }}
                      className="
          w-full h-12 px-4 rounded-xl 
          flex items-center justify-between
          backdrop-blur-xl 
          bg-white/30 dark:bg-neutral-900/30
          border border-white/20 dark:border-neutral-700/40
          shadow-sm dark:shadow-none
          transition-all duration-300 ease-out
          hover:bg-white/40 dark:hover:bg-neutral-900/40
          hover:border-white/30 dark:hover:border-neutral-600/50
          relative overflow-hidden
        "
                    >
                      {/* Gradient shimmer highlight */}
                      <span
                        className="
          absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300
          bg-linear-to-r from-transparent via-white/10 to-transparent
        "
                      />

                      <span className="text-base font-medium tracking-wide">
                        {item.label}
                      </span>

                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.2 }}
                        className="text-neutral-700 dark:text-neutral-300"
                      >
                        {item.icon}
                      </motion.div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </WobbleCard>
          </div>
          <div className="row-span-2 col-start-1 row-start-5">
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px]"
              className=""
            >
              <div className="max-w-xs">
                <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-muted-foreground">
                  Gippity AI powers the entire universe
                </h2>
                <p className="mt-4 text-left  text-base/6 text-neutral-200">
                  With over 100,000 mothly active bot users, Gippity AI is the
                  most popular AI platform for developers.
                </p>
              </div>
            </WobbleCard>
          </div>
          <div className="row-span-2 col-start-2 row-start-5">
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px]"
              className=""
            >
              <div className="max-w-xs">
                <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-muted-foreground">
                  Gippity AI powers the entire universe
                </h2>
                <p className="mt-4 text-left  text-base/6 text-neutral-200">
                  With over 100,000 mothly active bot users, Gippity AI is the
                  most popular AI platform for developers.
                </p>
              </div>
            </WobbleCard>
          </div>
          <div className="row-span-3 col-start-3 row-start-4">
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px]"
              className=""
            >
              <div className="max-w-xs">
                <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-muted-foreground">
                  Gippity AI powers the entire universe
                </h2>
                <p className="mt-4 text-left  text-base/6 text-neutral-200">
                  With over 100,000 mothly active bot users, Gippity AI is the
                  most popular AI platform for developers.
                </p>
              </div>
            </WobbleCard>
          </div>
          <div className="col-span-2 row-span-6 col-start-2 row-start-7">
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px]"
              className=""
            >
              <div className="max-w-xs">
                <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-muted-foreground">
                  Gippity AI powers the entire universe
                </h2>
                <p className="mt-4 text-left  text-base/6 text-neutral-200">
                  With over 100,000 mothly active bot users, Gippity AI is the
                  most popular AI platform for developers.
                </p>
              </div>
            </WobbleCard>
          </div>
          <div className="row-span-6 col-start-1 row-start-7">
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px]"
              className=""
            >
              <div className="max-w-xs">
                <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-muted-foreground">
                  Gippity AI powers the entire universe
                </h2>
                <p className="mt-4 text-left  text-base/6 text-neutral-200">
                  With over 100,000 mothly active bot users, Gippity AI is the
                  most popular AI platform for developers.
                </p>
              </div>
            </WobbleCard>
          </div>
        </div>
      </div>
    </div>
  );
};
