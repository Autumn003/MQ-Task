"use client";

import { useEffect, useRef, useState } from "react";
// import "remixicon/fonts/remixicon.css";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
// import data from '@/comp.json';
import Link from "next/link";
import { IconBrandTabler, IconCircle, IconFile } from "@tabler/icons-react";

const data = {
  items: [
    {
      name: "theme-toggler",
      title: "Theme Toggler",
      description: "A theme toggler button",
      thumbnail: "/media/theme.jpg",
    },
    {
      name: "expandable-card",
      title: "Expandable Card",
      description: "An iphone style expandable card",
      thumbnail: "/media/expandable-card.png",
    },
    {
      name: "scrolling-macbook",
      title: "Scrolling Macbook",
      description: "Scrolling macbook with hover effect",
      thumbnail: "/media/scrolling-macbook.png",
    },
    {
      name: "flip-words",
      title: "Flip Words",
      description: "A component to flip words with a smooth transition effect.",
      thumbnail: "/media/flip-words.png",
    },
    {
      name: "file-upload",
      title: "File Upload",
      description: "A file upload component with drag and drop support.",
      thumbnail: "/media/file-upload.png",
    },
    {
      name: "floating-elements-card",
      title: "Floating Elements Card",
      description:
        "A card with floating elements appears arround the content on hover.",
      thumbnail: "/media/floating-elements-card.png",
    },
    {
      name: "ios-notifications-stack",
      title: "IOS Notifications Stack",
      description:
        "Animated iOS-style notification stack with expandable and collapsible layers.",
      thumbnail: "/media/ios-notifications-stack.png",
    },
    {
      name: "reveal-pane",
      title: "Reveal Pane",
      description:
        "Image comparison slider drag to reveal differences between two images.",
      thumbnail: "/media/reveal-pane.png",
    },
    {
      name: "shiny-button",
      title: "Shiny Button",
      description: "A button with a shiny hover effect.",
      thumbnail: "/media/shiny-button.png",
    },
    {
      name: "featured-globe",
      title: "Featured Globe",
      description:
        "Interactive 3D globe with scroll-triggered text animations.",
      thumbnail: "/media/featured-globe.png",
    },
    {
      name: "carousel",
      title: "Carousel",
      description:
        "Animated carousel with smooth transitions and navigation controls.",
      thumbnail: "/media/carousel.png",
    },
    {
      name: "progress-card",
      title: "Progress Card",
      description:
        "Interactive progress card with percentage indicators and progress bar.",
      thumbnail: "/media/progress-card.png",
    },
    {
      name: "payment-card-3d",
      title: "Payment Card 3D",
      description:
        "A 3D interactive payment card with flip, tilt, glare, and secure detail reveal.",
      thumbnail: "/media/payment-card-3d.png",
    },
  ],
};

const links = [
  {
    title: "Components",
    link: "/components",
  },
  {
    title: "Templates",
    link: "/templates",
  },
  {
    title: "Pricing",
    link: "/pricing",
  },
  // {
  //     title: 'Posts',
  //     link: '/posts',
  // },
];

const installation = [
  {
    title: "Install Next.js",
    link: "/docs/install-nextjs",
  },
  {
    title: "Install Tailwind v4",
    link: "/docs/tailwind-v4",
  },
  {
    title: "Add Utilities",
    link: "/docs/add-utilities",
  },
  {
    title: "CLI",
    link: "/docs/cli",
  },
];

export default function SearchBox({
  isDialogOpen,
  setIsDialogOpen,
  className,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  className?: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsDialogOpen(!isDialogOpen);
      }

      if (event.key === "Escape" && isDialogOpen) {
        setIsDialogOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsDialogOpen, isDialogOpen]);

  // Focus input when dialog opens
  useEffect(() => {
    if (isDialogOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isDialogOpen]);

  // Reset search when dialog closes
  useEffect(() => {
    if (!isDialogOpen) {
      setSearchQuery("");
    }
  }, [isDialogOpen]);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isDialogOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDialogOpen]);

  const components = [...data.items].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  // Filter items based on search query
  const filteredLinks = links.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInstallation = installation.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredComponents = components.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasResults =
    filteredLinks.length > 0 ||
    filteredInstallation.length > 0 ||
    filteredComponents.length > 0;

  return (
    <>
      {isDialogOpen && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.1 }}
          className={cn(
            "bg-secondary text-secondary-foreground border-muted-background flex h-90 w-140 flex-col rounded-xl border pb-2 shadow-2xl transition-all duration-300",
            className
          )}
          ref={boxRef}
        >
          <div className="border-muted-background flex items-center gap-2 border-b px-4 py-3">
            <i className="ri-search-line text-secondary-foreground text- font-semibold"></i>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search QDeep or command . . ."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-secondary-foreground placeholder:text-muted-foreground w-full bg-transparent outline-none"
            />
            <button onClick={() => setIsDialogOpen(false)} className="shrink-0">
              <i className="ri-close-line text-secondary-foreground hover:bg-muted-background cursor-pointer rounded-lg p-1 transition-colors duration-200"></i>
            </button>
          </div>

          <div className="custom-scrollbar flex h-full flex-col overflow-y-auto px-2 py-4">
            {!hasResults && searchQuery && (
              <div className="flex h-full items-center justify-center">
                <p className="text-secondary-foreground">
                  No results found for "{searchQuery}"
                </p>
              </div>
            )}

            {(!searchQuery || filteredLinks.length > 0) && (
              <div className="mb-2">
                {!searchQuery && (
                  <h3 className="text-secondary-foreground px-2 text-sm font-semibold">
                    Suggestions
                  </h3>
                )}
                {filteredLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    onClick={() => setIsDialogOpen(false)}
                    className="hover:bg-input text-muted-foreground flex w-full items-center gap-4 rounded-md p-3 text-sm transition-colors duration-200"
                  >
                    <IconFile className="text-neutral-600 dark:text-neutral-300 h-5 w-5" />
                    {item.title}
                  </Link>
                ))}
              </div>
            )}

            {(!searchQuery || filteredInstallation.length > 0) && (
              <div className="mb-2">
                {!searchQuery && (
                  <h3 className="text-secondary-foreground px-2 text-sm font-semibold">
                    Commands
                  </h3>
                )}
                {filteredInstallation.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    onClick={() => setIsDialogOpen(false)}
                    className="hover:bg-input text-muted-foreground flex w-full items-center gap-4 rounded-md p-3 text-sm transition-colors duration-200"
                  >
                    <IconBrandTabler className="text-neutral-600 dark:text-neutral-300 h-5 w-5" />
                    {item.title}
                  </Link>
                ))}
              </div>
            )}

            {(!searchQuery || filteredComponents.length > 0) && (
              <div>
                {!searchQuery && (
                  <h3 className="text-secondary-foreground px-2 text-sm font-semibold">
                    Recent searches
                  </h3>
                )}
                {filteredComponents.map((item, index) => (
                  <Link
                    key={index}
                    href={`/components/${item.name}`}
                    onClick={() => setIsDialogOpen(false)}
                    className="hover:bg-input text-muted-foreground flex w-full items-center gap-4 rounded-md p-3 text-sm transition-colors duration-200"
                  >
                    <IconCircle className="text-neutral-600 dark:text-neutral-300 h-5 w-5" />
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
}
