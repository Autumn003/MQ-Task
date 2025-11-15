"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

export function SignupForm() {
  const [isExistingUser, setIsExistingUser] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{
            opacity: 0,
            y: 100,
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.3,
              ease: "easeInOut",
            },
          }}
          exit={{
            opacity: 0,
            y: 100,
          }}
          className="shadow-input mx-auto w-full max-w-xl rounded-none bg-white p-4 border-2 sm:rounded-2xl dark:bg-black flex sm:flex-row flex-col-reverse "
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center w-full flex flex-col justify-between p-4"
          >
            <div className="sm:block hidden ">
              <h2 className="text-xl  font-bold text-neutral-800 dark:text-neutral-200">
                {isExistingUser
                  ? "Welcome back to Quantum Network"
                  : "Welcome to Quantum Network"}
              </h2>
              <p className="mt-2 smax-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                {isExistingUser
                  ? "Lorem ipsum dolor sit amet consectetur adipisicing."
                  : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mt-5">
                {isExistingUser
                  ? "Create new account"
                  : " Already have an account?"}
              </p>
              <button
                className="bg-primary w-full h-10 mt-2 rounded-lg text-secondary font-semibold inset-shadow-sm shadow-[0_0_10px_2px_rgba(160,160,160,0.6)] inset-shadow-neutral-500 cursor-pointer"
                onClick={() => setIsExistingUser(!isExistingUser)}
              >
                {isExistingUser ? "Signup" : "Login"}
              </button>
            </div>
          </motion.div>

          <form className="p-4 w-full" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {isExistingUser ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <LabelInputContainer className="mb-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      placeholder="dev.omar@qmail.com"
                      type="email"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-8">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type="password"
                    />
                  </LabelInputContainer>
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <div className="mb-2 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                    <LabelInputContainer>
                      <Label htmlFor="firstname">First name</Label>
                      <Input id="firstname" placeholder="Omar" type="text" />
                    </LabelInputContainer>
                    <LabelInputContainer>
                      <Label htmlFor="lastname">Last name</Label>
                      <Input id="lastname" placeholder="Alburihi" type="text" />
                    </LabelInputContainer>
                  </div>
                  <LabelInputContainer className="mb-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      placeholder="dev.omar@qmail.com"
                      type="email"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type="password"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-8">
                    <Label htmlFor="confirmpassword">Confirm password</Label>
                    <Input
                      id="confirmpassword"
                      placeholder="••••••••"
                      type="confirmpassword"
                    />
                  </LabelInputContainer>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              className="group/btn relative block h-10 w-full rounded-md bg-linear-to-br from-neutral-200 to-neutral-300 font-medium text-primary  dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 shadow-[0_0_10px_2px_rgba(166,166,166,0.4)] dark:inset-shadow-neutral-500 inset-shadow-neutral-50 inset-shadow-sm cursor-pointer"
              type="submit"
            >
              {isExistingUser ? "Login" : "Sign up"} &rarr;
              <BottomGradient />
            </button>

            {/* <div className="my-8 h-px w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" /> */}

            {/* <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </button>
        </div> */}
          </form>
          <h2 className="text-xl mx-auto max-w-xs text-center mb-2 sm:hidden font-bold text-neutral-800 dark:text-neutral-200">
            {isExistingUser
              ? "Welcome back to Quantum Network"
              : "Welcome to Quantum Network"}
          </h2>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-linear-to-r from-transparent via-sky-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100 " />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100 shadow-[0_4px_20px_1px_rgba(0,166,244,1)]" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
