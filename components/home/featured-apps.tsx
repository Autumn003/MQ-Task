"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import Image from "next/image";

export function FaeturedApps() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-136 xl:grid-rows-2 my-15">
      <App
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Image src="/qmask.png" width={30} height={30} alt="QM" />}
        title="QMask Wallet"
        description="Securely manage your digital assets with fast payments and seamless wallet access."
      />

      <App
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Image src="/qcom.png" width={30} height={30} alt="QM" />}
        title="QCom Messanger"
        description="Chat instantly with friends using fast, encrypted messaging across all your devices."
      />

      <App
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Image src="/qshop.png" width={30} height={30} alt="QM" />}
        title="QShop Ecommerce"
        description="Discover and shop quality products with smooth checkout and quick delivery options."
      />

      <App
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Image src="/qtrade.png" width={30} height={30} alt="QM" />}
        title="QTrade Stocks"
        description="Trade stocks effortlessly with real-time insights, smart tools, and secure transactions."
      />

      <App
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Image src="/qmail.png" width={30} height={30} alt="QM" />}
        title="Qmail"
        description="Fast, reliable email service with clean design and powerful productivity features."
      />
    </ul>
  );
}

interface AppProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const App = ({ area, icon, title, description }: AppProps) => {
  return (
    <li className={`min-h-56 list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] backdrop-blur-xs">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-1">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
