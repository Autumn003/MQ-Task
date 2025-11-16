"use client";

import { WobbleCard } from "../ui/card";
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
                <p className="mt-4 text-left  text-base/6 text-neutral-200"></p>
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
