// store/notificationStore.ts
import { create } from "zustand";

type Notification = {
  id: string;
  message: string;
  type: "success" | "error" | "info";
};

type NotificationState = {
  notifications: Notification[];
  pushEnabled: boolean;
  addNotification: (msg: string, type?: "success" | "error" | "info") => void;
  removeNotification: (id: string) => void;
  togglePush: () => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  pushEnabled: true, // default ON
  addNotification: (msg, type = "info") =>
    set((state) => {
      if (!state.pushEnabled) return state; // respect settings
      const newNotification = { id: Date.now().toString(), message: msg, type };
      return { notifications: [...state.notifications, newNotification] };
    }),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  togglePush: () => set((state) => ({ pushEnabled: !state.pushEnabled })),
}));
