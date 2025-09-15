// // components/NotificationContainer.tsx
// "use client";
// import { useNotificationStore } from "@/lib/notificationStore";
// import { useEffect } from "react";

// export default function NotificationContainer() {
//   const { notifications, removeNotification } = useNotificationStore();

//   useEffect(() => {
//     // Auto dismiss notifications
//     notifications.forEach((n) => {
//       setTimeout(() => removeNotification(n.id), 3000); // 3s timeout
//     });
//   }, [notifications, removeNotification]);

//   console.log("Active notifications:", notifications)

//   return (
    
//     <div className="fixed top-4 left-4 space-y-2 z-50">
//       {notifications.map((n) => (
//         <div
//           key={n.id}
//           className={`px-4 py-2 rounded-lg shadow-lg text-white ${
//             n.type === "success"
//               ? "bg-green-600"
//               : n.type === "error"
//               ? "bg-red-600"
//               : "bg-blue-600"
//           }`}
//         >
//           {n.message}
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";
import { useNotificationStore } from "@/lib/notificationStore";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotificationStore();

  useEffect(() => {
    if (notifications.length === 0) return;
    const timers = notifications.map((n) =>
      setTimeout(() => removeNotification(n.id), 3000)
    );
    return () => timers.forEach(clearTimeout);
  }, [notifications, removeNotification]);

  return (
    <div className="fixed top-4 left-4 space-y-2 z-50">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className={`px-4 py-2 rounded-lg shadow-lg text-white ${
              n.type === "success"
                ? "bg-green-600"
                : n.type === "error"
                ? "bg-red-600"
                : "bg-blue-600"
            }`}
          >
            {n.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
