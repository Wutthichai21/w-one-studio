import { useNotification } from "@/contexts/NotificationContext";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * NotificationContainer - แสดง Push Notifications ที่มุมขวาล่างของหน้าจอ
 *
 * Design: Minimalist Intellectual
 * - ใช้สีหลักของสตูดิโอ (burnt orange) สำหรับ success
 * - ตำแหน่ง: มุมขวาล่าง
 * - Animation: Smooth slide-in และ fade-out
 */

export function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (notifications.length === 0) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [notifications]);

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "info":
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none space-y-3">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`
            pointer-events-auto
            flex items-start gap-3 p-4 rounded-lg border
            ${getBackgroundColor(notification.type)}
            shadow-lg
            animate-in slide-in-from-right-full fade-in duration-300
            animate-out slide-out-to-right-full fade-out duration-300
          `}
        >
          <div className="flex-shrink-0 pt-0.5">
            {getIcon(notification.type)}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">
              {notification.message}
            </p>
          </div>

          <button
            onClick={() => removeNotification(notification.id)}
            className="flex-shrink-0 text-foreground/50 hover:text-foreground transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
