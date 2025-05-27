"use client"
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react"
import { useUI } from "@/context/UIContext"
import clsx from "clsx"

const NotificationContainer = () => {
  const { notifications, removeNotification } = useUI()

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-400" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-400" />
      default:
        return <Info className="h-5 w-5 text-blue-400" />
    }
  }

  const getStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "error":
        return "bg-red-50 border-red-200"
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={clsx(
            "max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto border",
            getStyles(notification.type),
            "animate-slide-up",
          )}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">{getIcon(notification.type)}</div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                {notification.message && <p className="mt-1 text-sm text-gray-500">{notification.message}</p>}
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotificationContainer
