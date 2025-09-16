import { AppointmentForm } from "@/components/forms/appointment-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CalendarCheck } from "lucide-react"

interface BookingPageProps {
  onNavigate: (page: string) => void
  onBookingSuccess: (tokenNumber: string) => void
}

export function BookingPage({ onNavigate, onBookingSuccess }: BookingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate("home")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <CalendarCheck className="h-8 w-8 text-medical-blue" />
              <h1 className="text-3xl font-bold">Book Your Appointment</h1>
            </div>
            <p className="text-muted-foreground max-w-md">
              Fill in your details below to book an appointment and get your queue token. 
              You'll be able to track your position in real-time.
            </p>
          </div>

          <AppointmentForm onBookingSuccess={onBookingSuccess} />
        </div>
      </div>
    </div>
  )
}