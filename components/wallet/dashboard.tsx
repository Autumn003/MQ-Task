"use client";

import { WobbleCard } from "../ui/card";
import { motion } from "motion/react";
import {
  IconDownload,
  IconKey,
  IconRouteSquare2,
  IconSend,
} from "@tabler/icons-react";
import { SendMQPY } from "../dashboard/send-MQPY";
import { AccountOverview } from "../dashboard/account-overview";
import { UsdOperations } from "../dashboard/usd-operations";
import { ExpandableCard } from "../ui/expandable-card";

// Sample user data
const user = {
  balance: 12500,
  totalMQPY: "12,500.00",
  receiveAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb4",
  level: "Golden",
};

export const Dashboard = () => {
  return (
    <div className="flex flex-1 h-full min-w-0">
      <div className="container h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900 overflow-y-auto @container">
        <div className=" flex">
          <div className="w-full h-10 pt-10">
            <div className="bg-white h-full w-full"></div>
          </div>
        </div>
        <div className="@xl:grid @xl:grid-cols-3 @xl:grid-rows-3 gap-6 flex flex-col my-5">
          <div className="col-span-2 row-span-2 col-start-1 row-start-1">
            <WobbleCard
              containerClassName="h-full min-h-[500px] lg:min-h-[300px]"
              className=""
            >
              <AccountOverview user={user} />
            </WobbleCard>
          </div>
          <div className="col-start-3 row-start-1">
            {/* <WobbleCard
              containerClassName="h-full min-h-[500px] lg:min-h-[300px] dark:bg-neutral-950"
              className="py-10 shadow-[0_0_20px_10px_rgba(0,0,0,0.3)_inset]"
            >
              <div className="max-w-xs w-full space-y-5">
                <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold bg-linear-to-r from-neutral-400 via-neutral-200 to-neutral-400 bg-clip-text text-transparent text-center tracking-wide drop-shadow-sm">
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
                        boxShadow: "0 6px 18px rgba(0,0,0,)",
                        transition: { duration: 0.15 },
                      }}
                      className="w-full h-12 px-4 rounded-xl flex items-center justify-between bg-white/10 dark:bg-neutral-900/30  transition-all duration-300 ease-out hover:bg-white/40 dark:hover:bg-neutral-900/40 hover:border-white/30 dark:hover:border-neutral-600/50 relative overflow-hidden shadow-inner dark:shadow-neutral-500/70 shadow-neutral-200/70 "
                    >
                      <span className="text-base font-medium tracking-wide ">
                        {item.label}
                      </span>

                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.2 }}
                        className="text-neutral-800 dark:text-neutral-300 shadow-inner shadow-neutral-900/70  p-1 rounded-lg"
                      >
                        {item.icon}
                      </motion.div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </WobbleCard> */}
            <ExpandableCard />
          </div>
          <div className="col-start-1 row-start-3">
            <div className=" relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
              <SendMQPY />
            </div>
          </div>
          <div className="col-start-2 row-start-3">
            <UsdOperations />
          </div>
          <div className="row-span-3 col-start-3 row-start-2">
            <WobbleCard
              containerClassName="h-full min-h-[500px] lg:min-h-[300px]"
              className=""
            >
              <div className="max-w-xs">
                <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-muted-foreground">
                  Recent Activities
                </h2>
                <p className="mt-4 text-left  text-base/6 text-neutral-200">
                  With over 100,000 mothly active bot users, Gippity AI is the
                  most popular AI platform for developers.
                </p>
              </div>
            </WobbleCard>
          </div>
          {/* <div className="row-span-1 col-span-2 col-start-1 row-start-4">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};
