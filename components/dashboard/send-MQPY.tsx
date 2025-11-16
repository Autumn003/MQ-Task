"use client";

import { motion } from "motion/react";
import { Input } from "../ui/input";
import React, { useState } from "react";
import { IconSend } from "@tabler/icons-react";

export const SendMQPY = () => {
  const [amount, setAmount] = useState(0);
  const [quantumId, setQuantumId] = useState("");

  const feePercentages = {
    economy: 3.75,
    standard: 5,
    fast: 6.25,
  } as const;

  type Speed = keyof typeof feePercentages;
  const [selected, setSelected] = useState<Speed>("economy");

  const fee = ((amount || 0) * feePercentages[selected]) / 100;
  const total = amount + fee;

  const handleSendAmount = () => {
    alert(
      `Request for Sending, ${amount} MQPY to ${quantumId} including platfor fees: ${fee}. Your total deduction for this request is: ${total}`
    );
  };
  return (
    <div className="px-5 py-10 space-y-4 bg-linear-to-r from-neutral-300 via-neutral-100 to-neutral-200 dark:from-neutral-900 dark:via-neutral-700 dark:to-neutral-900 h-full w-full inset-shadow-sm inset-shadow-white dark:inset-shadow-neutral-500 rounded-4xl">
      <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold bg-linear-to-r from-neutral-600 via-neutral-300 to-neutral-600 dark:from-neutral-400 dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent text-center tracking-wide drop-shadow-sm">
        Send MQPY
      </h4>

      <Input
        className="inset-shadow-sm dark:inset-shadow-neutral-900 inset-shadow-neutral-300"
        id="quantumid"
        placeholder="To: Quantum ID"
        type="text"
        onChange={(e) => setQuantumId(e.target.value)}
      />

      <Input
        className="inset-shadow-sm dark:inset-shadow-neutral-900 inset-shadow-neutral-300"
        id="amount"
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <RadioToggle selected={selected} setSelected={setSelected} />

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <div className="text-neutral-500 text-sm font-medium">
            Fee: <span className="text-muted-foreground">{fee.toFixed(2)}</span>
          </div>
          <div className="text-neutral-500 text-sm font-medium">
            Total:{" "}
            <span className="text-muted-foreground text-lg">
              {total.toFixed(2)}
            </span>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{
            duration: 0.03,
          }}
          disabled={!amount || amount <= 0 || !quantumId || quantumId === ""}
          className="px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg shadow-neutral-600/50 bg-neutral-300 text-neutral-900 dark:bg-neutral-800 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700/40 flex gap-1.5 items-center inset-shadow-neutral-100/90 dark:inset-shadow-neutral-600  dark:hover:inset-shadow-neutral-500 hover:inset-shadow-neutral-100 inset-shadow-sm hover:backdrop-blur-sm"
          onClick={handleSendAmount}
        >
          <IconSend size={18} />
          Send
        </motion.button>
      </div>
    </div>
  );
};

const RadioToggle = ({ selected, setSelected }: any) => {
  const options = [
    { id: "economy", label: "Economy" },
    { id: "standard", label: "Standard" },
    { id: "fast", label: "Fast" },
  ];

  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative bg-linear-to-r dark:from-neutral-800 dark:via-neutral-600 dark:to-neutral-800 from-neutral-300 via-neutral-200 to-neutral-300 rounded-full py-1 px-2 inset-shadow-sm dark:inset-shadow-neutral-500 inset-shadow-neutral-100 shadow-lg shadow-neutral-500/30">
        <div
          className="grid relative"
          style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}
        >
          {/* Highlight */}
          <motion.div
            className="absolute top-1 bottom-1 bg-linear-to-r from-neutral-300/20 to-neutral-200/20 dark:from-neutral-600/20 dark:to-neutral-500/20 shadow-lg inset-shadow-sm dark:inset-shadow-neutral-400 inset-shadow-neutral-50 rounded-full backdrop-blur-sm shadow-neutral-400/40 dark:shadow-neutral-600/40"
            initial={false}
            animate={{
              left: `${
                (options.findIndex((o) => o.id === selected) * 100) /
                options.length
              }%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              width: `${100 / options.length}%`,
            }}
          />

          {/* Options */}
          {options.map((option) => (
            <label
              key={option.id}
              className={`relative z-10 text-center px-4 py-3 cursor-pointer font-medium text-sm transition-colors duration-200 ${
                selected === option.id ? "text-white" : "text-gray-400"
              }`}
            >
              <input
                type="radio"
                name="toggle"
                className="hidden"
                checked={selected === option.id}
                onChange={() => setSelected(option.id)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
