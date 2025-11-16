import { Check, Copy } from "lucide-react";
import { useState } from "react";

const MQPY_rate = 0.3;

export const AccountOverview = ({ user }: any) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(user.receiveAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-12 @container">
        <h4 className="text-3xl @md:text-4xl @lg:text-5xl font-bold bg-linear-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
          Account Overview
        </h4>
        <div className="flex items-center gap-3">
          <div className="group relative px-3 py-1 rounded-full bg-linear-to-r from-amber-400/50 to-amber-600/50 border border-amber-500/30 backdrop-blur-sm hover:border-amber-400/50 transition-all duration-300 shadow-inner dark:shadow-amber-300/70 shadow-amber-200/70">
            <span className="text-amber-300 font-semibold text-sm">
              {user.level}
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
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br dark:from-neutral-800/80 dark:to-neutral-900/10 from-neutral-300/50 to-neutral-400/50 border border-neutral-700/50 backdrop-blur-xl p-8 mb-8 hover:border-neutral-600/50 transition-all duration-300 group shadow-inner dark:shadow-neutral-300/70 shadow-neutral-100">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-neutral-500/5 via-neutral-500/5 to-neutral-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          <p className="text-neutral-400 text-sm md:text-base font-medium mb-3 flex items-center gap-2">
            Total MQPY
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </p>
          <h2 className="text-3xl sm:text-4xl @md:text-5xl @lg:text-6xl font-bold bg-linear-to-r from-neutral-400 via-neutral-400 to-neutral-400 bg-clip-text text-transparent mb-2">
            {user.totalMQPY}
          </h2>
          <div className="mx-2 bg-muted-foreground w-fit px-2 py-2 rounded-full inset-shadow-sm inset-shadow-muted/60 shadow-lg shadow-muted/50 dark:text-neutral-600 text-neutral-300 font-semibold">
            <p className=" text-sm">
              {Number(user.balance) * MQPY_rate}{" "}
              <span className="text-xs dark:text-neutral-200 text-white">
                USD
              </span>
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-neutral-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-neutral-500/20 rounded-full blur-3xl" />
      </div>

      {/* Receive Address Card */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br dark:from-neutral-800/50 dark:to-neutral-400/20 from-neutral-300/50 to-neutral-400/50 border border-neutral-700/50 backdrop-blur-xl p-8 mb-8 hover:border-neutral-600/50 transition-all duration-300 group shadow-inner dark:shadow-neutral-300/70 shadow-neutral-100 @container">
        <div className="flex flex-col @lg:flex-row sm:items-end-safe justify-between gap-4">
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

      {/* Remaining */}
      <div>
        <div className="w-full overflow-hidden rounded-3xl bg-linear-to-br from-neutral-700 via-neutral-500 to-neutral-700  dark:from-neutral-300/10 dark:via-neutral-100/30 dark:to-neutral-300/10 p-8 mb-8 shadow-[0_0_20px_rgba(0,0,0,0.4)] dark:shadow-[0_0_25px_rgba(0,0,0,0.35) transition-all duration-500 group relative inset-shadow-sm inset-shadow-white dark:inset-shadow-black/80">
          {/* Glow on hover */}
          <div className=" absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 bg-linear-to-br from-white/10 to-white/30 dark:from-neutral-100/10 dark:to-neutral-400/30 blur-xl transition-opacity duration-500 pointer-events-none"></div>

          <div className="relative flex flex-col gap-5">
            <div>
              <p className="text-neutral-300 text-sm font-semibold tracking-wide mb-2">
                Token Metrics
              </p>
              <div className="flex gap-3 @md:flex-row flex-col">
                <div className="w-full dark:text-neutral-100 text-neutral-800 font-mono text-xs sm:text-sm px-5 py-4 rounded-xl bg-neutral-200 dark:bg-neutral-800 inset-shadow-sm inset-shadow-neutral-500 dark:inset-shadow-neutral-950">
                  <p className="flex justify-between">
                    <span>Total Supply:</span>
                    <span className="font-bold text-muted-foreground">
                      53.538 MQPY
                    </span>
                  </p>

                  <p className="flex justify-between mt-1">
                    <span>Last Inflation:</span>
                    <span className="font-bold text-muted-foreground">
                      NULL
                    </span>
                  </p>
                </div>
                <div className="w-full dark:text-neutral-100 text-neutral-800 font-mono text-xs sm:text-sm px-5 py-4 rounded-xl bg-neutral-200 dark:bg-neutral-800 inset-shadow-sm inset-shadow-neutral-500 dark:inset-shadow-neutral-950">
                  <p className="flex justify-between">
                    <span>Private Fee:</span>
                    <span className="font-bold text-muted-foreground">
                      1.00%
                    </span>
                  </p>

                  <p className="flex justify-between mt-1">
                    <span>Fees Vault:</span>
                    <span className="font-bold text-muted-foreground">
                      0 MQPY
                    </span>
                  </p>

                  <p className="flex justify-between mt-1">
                    <span>Burn of Fee:</span>
                    <span className="font-bold text-muted-foreground">
                      25.00%
                    </span>
                  </p>

                  <p className="flex justify-between mt-1">
                    <span>Rewards Pool:</span>
                    <span className="font-bold text-muted-foreground">
                      0.03 MQPY
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 @md:flex-row flex-col">
          <div className="w-full overflow-hidden rounded-3xl bg-linear-to-br from-neutral-700 via-neutral-500 to-neutral-700  dark:from-neutral-300/10 dark:via-neutral-100/30 dark:to-neutral-300/10 p-8 mb-8 shadow-[0_0_20px_rgba(0,0,0,0.4)] dark:shadow-[0_0_25px_rgba(0,0,0,0.35) transition-all duration-500 group relative inset-shadow-sm inset-shadow-white dark:inset-shadow-black/80">
            {/* Glow on hover */}
            <div className=" absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 bg-linear-to-br from-white/10 to-white/30 dark:from-neutral-100/10 dark:to-neutral-400/30 blur-xl transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative flex flex-col gap-5">
              <div>
                <p className="text-neutral-300 text-sm font-semibold tracking-wide mb-2">
                  Staking Snapshot
                </p>
                <div className="dark:text-neutral-100 text-neutral-800 font-mono text-xs sm:text-sm px-5 py-4 rounded-xl bg-neutral-200 dark:bg-neutral-800 inset-shadow-sm inset-shadow-neutral-500 dark:inset-shadow-neutral-950">
                  <p className="flex justify-between">
                    <span>Stake:</span>
                    <span className="font-bold text-muted-foreground">00</span>
                  </p>

                  <p className="flex justify-between mt-1">
                    <span>Staked On:</span>
                    <span className="font-bold text-muted-foreground">
                      NULL
                    </span>
                  </p>

                  <p className="flex justify-between mt-1">
                    <span>Unlock After:</span>
                    <span className="font-bold text-muted-foreground">
                      NULL
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full overflow-hidden rounded-3xl bg-linear-to-br from-neutral-700 via-neutral-500 to-neutral-700  dark:from-neutral-300/10 dark:via-neutral-100/30 dark:to-neutral-300/10 p-8 mb-8 shadow-[0_0_20px_rgba(0,0,0,0.4)] dark:shadow-[0_0_25px_rgba(0,0,0,0.35) transition-all duration-500 group relative inset-shadow-sm inset-shadow-white dark:inset-shadow-black/80">
            {/* Glow on hover */}
            <div className=" absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 bg-linear-to-br from-white/10 to-white/30 dark:from-neutral-100/10 dark:to-neutral-400/30 blur-xl transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative flex flex-col gap-5">
              <div>
                <p className="text-neutral-300 text-sm font-semibold tracking-wide mb-2">
                  Network
                </p>

                <div className="dark:text-neutral-100 text-neutral-800 font-mono text-xs sm:text-sm px-5 py-4 rounded-xl bg-neutral-200 dark:bg-neutral-800 inset-shadow-sm inset-shadow-neutral-500 dark:inset-shadow-neutral-950">
                  <p className="flex justify-between">
                    <span>Latency:</span>
                    <span className="font-bold text-muted-foreground">
                      99ms
                    </span>
                  </p>

                  <p className="flex justify-between mt-1">
                    <span>Status:</span>
                    <span className="font-bold text-muted-foreground">OK</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
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
  );
};
