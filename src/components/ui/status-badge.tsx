import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Clock, Play, CheckCircle, X, Scan } from "lucide-react"

interface StatusBadgeProps {
  status: "waiting" | "inside" | "completed" | "skipped" | "sent_to_scan"
  className?: string
}

const statusConfig = {
  waiting: {
    label: "Waiting",
    icon: Clock,
    className: "bg-status-waiting text-foreground border-yellow-300"
  },
  inside: {
    label: "Inside",
    icon: Play,
    className: "bg-status-inside text-foreground border-green-300"
  },
  completed: {
    label: "Completed",
    icon: CheckCircle,
    className: "bg-status-completed text-foreground border-gray-300"
  },
  skipped: {
    label: "Skipped",
    icon: X,
    className: "bg-status-skipped text-foreground border-red-300"
  },
  sent_to_scan: {
    label: "Sent to Scan",
    icon: Scan,
    className: "bg-status-scan text-foreground border-orange-300"
  }
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge className={cn(config.className, "flex items-center space-x-1", className)}>
      <Icon className="h-3 w-3" />
      <span>{config.label}</span>
    </Badge>
  )
}