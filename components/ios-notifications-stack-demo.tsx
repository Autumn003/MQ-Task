import { IOSNotificationsStack } from "@/components/ui/ios-notifications-stack";

const notifications = [
  {
    id: 1,
    title: "New Message",
    description:
      "You have received a new message from John Doe about the project update.",
  },
  {
    id: 2,
    title: "Calendar Reminder",
    description: "Your meeting with the design team starts in 15 minutes.",
  },
  {
    id: 3,
    title: "System Update",
    description:
      "iOS 18.2 is now available. Update now to get the latest features.",
  },
  {
    id: 4,
    title: "Email Notification",
    description: "You have 5 unread emails in your inbox. Check them out now.",
  },
  {
    id: 5,
    title: "App Update",
    description: "Instagram has been updated with new features and bug fixes.",
  },
  {
    id: 6,
    title: "Weather Alert",
    description:
      "Rain expected in your area this afternoon. Don't forget your umbrella!",
  },
  {
    id: 7,
    title: "Security Notice",
    description: "New login detected from Chrome on Windows. Was this you?",
  },
];

const IOSNotificationsStackDemo = () => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center my-5">
      <IOSNotificationsStack
        notifications={notifications}
        className="rounded-4xl p-6 h-full"
      />
    </div>
  );
};

export default IOSNotificationsStackDemo;
