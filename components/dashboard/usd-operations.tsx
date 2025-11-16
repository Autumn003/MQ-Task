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
    <div className="max-w-xs space-y-4">
      <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold bg-linear-to-r from-neutral-400 via-neutral-200 to-neutral-400 bg-clip-text text-transparent text-center tracking-wide drop-shadow-sm">
        USD Operations
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
            className="px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg shadow-neutral-600/50 bg-neutral-300 text-neutral-900 dark:bg-neutral-800 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700/40 flex gap-1.5 items-center inset-shadow-neutral-100/90 dark:inset-shadow-neutral-600  dark:hover:inset-shadow-neutral-500 hover:inset-shadow-neutral-100 inset-shadow-sm hover:backdrop-blur-sm"
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
