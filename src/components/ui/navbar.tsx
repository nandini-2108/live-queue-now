import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Activity, Users, Calendar, UserCheck } from "lucide-react"

interface NavbarProps {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  return (
    <nav className={cn("flex items-center justify-between p-4 bg-card border-b shadow-card", className)}>
      <div className="flex items-center space-x-2">
        <Activity className="h-8 w-8 text-medical-blue" />
        <span className="text-2xl font-bold text-foreground">MedQueue</span>
      </div>
      
      <div className="hidden md:flex items-center space-x-6">
        <Button variant="ghost" className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>Book Appointment</span>
        </Button>
        <Button variant="ghost" className="flex items-center space-x-2">
          <Users className="h-4 w-4" />
          <span>View Queue</span>
        </Button>
        <Button variant="ghost" className="flex items-center space-x-2">
          <UserCheck className="h-4 w-4" />
          <span>Staff Dashboard</span>
        </Button>
      </div>
    </nav>
  )
}