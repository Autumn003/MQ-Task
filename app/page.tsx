"use client";

import { Spotlight } from "@/components/home/hero";
import { QuickAppsBar } from "@/components/home/quick-apps-bar";
import { Window } from "@/components/ui/window";
import React, { useState } from "react";

export default function Home() {
  const appConfigs = [
    {
      title: "QMask",
      icon: <img src="/qmask.png" width={80} height={80} alt="QMask" />,
      content: <div>QMask App</div>,
    },
    {
      title: "QShop",
      icon: <img src="/qshop.png" width={80} height={80} alt="QShop" />,
      content: <div>QShop App</div>,
    },
    {
      title: "MQPY",
      icon: <img src="/mqpy.png" width={80} height={80} alt="MQPY" />,
      content: <div>MQPY App</div>,
    },
    {
      title: "QMail",
      icon: <img src="/qmail.png" width={80} height={80} alt="QMail" />,
      content: <div>QMail App</div>,
    },
    {
      title: "Dev Hub",
      icon: <img src="/devhub.png" width={80} height={80} alt="Dev Hub" />,
      content: <div>Dev Hub App</div>,
    },
    {
      title: "QDeep",
      icon: <img src="/spider-logo.png" width={80} height={80} alt="QDeep" />,
      content: <div>QDeep App</div>,
    },
    {
      title: "QTrade",
      icon: <img src="/qtrade.png" width={80} height={80} alt="QTrade" />,
      content: <div>QTrade App</div>,
    },
  ];

  const [apps, setApps] = useState(
    appConfigs.map((cfg) => ({
      title: cfg.title,
      icon: cfg.icon,
      status: "closed" as "open" | "closed",
      minimized: false,
    }))
  );

  // Open app (dock click -> open)
  const handleAppLaunch = (index: number) => {
    setApps((prev) =>
      prev.map((app, i) =>
        i === index ? { ...app, status: "open", minimized: false } : app
      )
    );
  };

  // Dock toggles minimize/hide
  const handleToggleMinimize = (index: number) => {
    setApps((prev) =>
      prev.map((app, i) =>
        i === index ? { ...app, minimized: !app.minimized } : app
      )
    );
  };

  // Close window (from Window 'X' button)
  const handleAppClose = (index: number) => {
    setApps((prev) =>
      prev.map((app, i) =>
        i === index ? { ...app, status: "closed", minimized: false } : app
      )
    );
  };

  return (
    <div className="relative min-h-screen w-full">
      <div>
        {apps.map((app, index) =>
          app.status === "open" && !app.minimized ? (
            <Window
              key={index}
              title={app.title}
              onClose={() => handleAppClose(index)}
              onMinimize={() => handleToggleMinimize(index)}
            >
              {appConfigs[index].content}
            </Window>
          ) : null
        )}

        <div className="fixed bottom-0 right-5 md:w-full mb-4 flex md:justify-center z-200">
          <QuickAppsBar
            apps={apps}
            onLaunch={handleAppLaunch}
            onToggleMinimize={handleToggleMinimize}
            onClose={handleAppClose}
          />
        </div>
      </div>
      <div className="min-h-screen w-full flex md:items-center md:justify-center dark:bg-black/70 bg-slate-100/70 antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight />
        <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-linear-to-b dark:from-gray-200 dark:to-gray-500 from-gray-400 to-gray-600 bg-opacity-50 z-50">
            MetaQuantum <br /> A quantum-native network
          </h1>
          <p className="mt-4 font-normal text-base dark:text-neutral-300 text-neutral-600 max-w-lg text-center mx-auto">
            A subtle yet effective spotlight effect, because the previous
            version is used a bit too much these days.
          </p>
        </div>
      </div>

      <div className="relative z-10 dark:bg-black/70 bg-slate-100/70 p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center dark:text-gray-200 text-gray-700 mb-8">
            More Content Below
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="p-6 rounded-lg bg-white/10 dark:bg-white/5 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold dark:text-gray-300 text-gray-700 mb-3">
                  Feature {item}
                </h3>
                <p className="dark:text-gray-400 text-gray-600">
                  This content scrolls while the world map stays fixed in the
                  background.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
