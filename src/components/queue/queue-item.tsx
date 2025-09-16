import { Card } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { cn } from "@/lib/utils"
import { Timer, User } from "lucide-react"

interface QueueItemProps {
  tokenNumber: string
  patientName: string
  status: "waiting" | "inside" | "completed" | "skipped" | "sent_to_scan"
  eta?: number // in minutes
  isCurrentUser?: boolean
  position?: number
  className?: string
}

export function QueueItem({ 
  tokenNumber, 
  patientName, 
  status, 
  eta, 
  isCurrentUser = false,
  position,
  className 
}: QueueItemProps) {
  return (
    <Card className={cn(
      "p-4 transition-all duration-200 hover:shadow-medical",
      isCurrentUser && "ring-2 ring-medical-blue bg-medical-blue-light",
      status === "skipped" && "bg-red-50 border-red-200",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
            {tokenNumber}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{patientName}</span>
              {isCurrentUser && (
                <span className="text-xs bg-medical-blue text-white px-2 py-1 rounded-full">
                  You
                </span>
              )}
            </div>
            {position && (
              <p className="text-sm text-muted-foreground">
                Position: {position}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end space-y-2">
          <StatusBadge status={status} />
          {eta && status === "waiting" && (
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Timer className="h-3 w-3" />
              <span>{eta} min</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}