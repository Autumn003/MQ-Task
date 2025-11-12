"use client";
import { Spotlight } from "@/components/home/hero";
import { WorldMap } from "@/components/ui/world-map";
import React from "react";

export default function Home() {
  return (
    <div className="relative ">
      {/* Fixed World Map Background */}
      <div className="fixed inset-0 bg-black -z-10">
        <WorldMap
          className="absolute inset-0 w-full min-h-screen"
          dots={[
            {
              start: {
                lat: 64.2008,
                lng: -149.4937,
              }, // Alaska (Fairbanks)
              end: {
                lat: 34.0522,
                lng: -118.2437,
              }, // Los Angeles
            },
            {
              start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
              end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            },
            {
              start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
              end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
            },
            {
              start: { lat: 51.5074, lng: -0.1278 }, // London
              end: { lat: 28.6139, lng: 77.209 }, // New Delhi
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
            },
          ]}
        />
      </div>

      {/* Scrollable Content */}
      <div className="relative min-h-screen w-full">
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

        {/* Additional scrollable content */}
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
    </div>
  );
}
