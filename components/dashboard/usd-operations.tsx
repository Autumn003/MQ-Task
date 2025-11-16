"use client";

import { motion } from "motion/react";
import { Input } from "../ui/input";
import React, { useState } from "react";
import {
  IconDownload,
  IconSend,
  IconShieldLock,
  IconUpload,
} from "@tabler/icons-react";

export const UsdOperations = () => {
  const [amount, setAmount] = useState(0);
  const [quantumId, setQuantumId] = useState("");

  const handleSend = () => {
    alert(`Send request for ${amount} USD to "${quantumId}" account`);
  };
  const handleDeposit = () => {
    alert(`Deposit request for ${amount} USD to "${quantumId}" account`);
  };
  const handleWithdraw = () => {
    alert(`Withdraw request for ${amount} USD to "${quantumId}" account`);
  };
  const handleVerify = () => {
    alert(`Verify request for ${amount} USD to "${quantumId}" account`);
  };

  const buttonsList = [
    {
      label: "Deposit",
      icon: <IconDownload size={18} />,
      onclick: handleDeposit,
    },
    {
      label: "Withdraw",
      icon: <IconUpload size={18} />,
      onclick: handleWithdraw,
    },
    {
      label: "Send",
      icon: <IconSend size={18} />,
      onclick: handleSend,
    },
    {
      label: "Verify",
      icon: <IconShieldLock size={18} />,
      onclick: handleVerify,
    },
  ];
  return (
    <div className="px-5 py-10 space-y-4 bg-linear-to-r dark:from-neutral-400 dark:via-neutral-200 dark:to-neutral-400 from-neutral-900 via-neutral-700 to-neutral-900 h-full w-full inset-shadow-sm dark:inset-shadow-white inset-shadow-neutral-500 rounded-4xl backdrop-blur-lg">
      <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold bg-linear-to-r dark:from-neutral-600 dark:via-neutral-300 dark:to-neutral-600 from-neutral-400 via-neutral-200 to-neutral-400 bg-clip-text text-transparent text-center tracking-wide drop-shadow-sm">
        USD Operations
      </h4>

      <Input
        className="inset-shadow-sm inset-shadow-neutral-900 dark:inset-shadow-neutral-300 dark:bg-neutral-100 bg-zinc-800 text-neutral-200 dark:text-neutral-800"
        id="quantumid"
        placeholder="To: Quantum ID"
        type="text"
        onChange={(e) => setQuantumId(e.target.value)}
      />

      <Input
        className="inset-shadow-sm inset-shadow-neutral-900 dark:inset-shadow-neutral-300 dark:bg-neutral-100 bg-zinc-800 text-neutral-200 dark:text-neutral-800 border-transparent outline-transparent"
        id="amount"
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <div className="flex items-center flex-wrap justify-around gap-4">
        {buttonsList.map((button, idx) => (
          <motion.button
            key={idx}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{
              duration: 0.03,
            }}
            disabled={!amount || amount <= 0 || !quantumId || quantumId === ""}
            className="px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg shadow-neutral-600/50 dark:bg-neutral-300 dark:text-neutral-900 bg-neutral-800 text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer dark:hover:bg-neutral-200 hover:bg-neutral-700/40 flex gap-1.5 items-center dark:inset-shadow-neutral-100/90 inset-shadow-neutral-600 hover:inset-shadow-neutral-500 dark:hover:inset-shadow-neutral-100 inset-shadow-sm hover:backdrop-blur-sm"
            onClick={button.onclick}
          >
            {button.icon}
            {button.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
