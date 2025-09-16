import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarPlus, Users, UserCheck, Activity, Clock, TrendingUp } from "lucide-react"

interface HomePageProps {
  onNavigate: (page: string) => void
  totalPatients: number
  activePatients: number
}

export function HomePage({ onNavigate, totalPatients, activePatients }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto p-4">
        {/* Hero Section */}
        <div className="text-center py-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Activity className="h-12 w-12 text-medical-blue" />
            <h1 className="text-5xl font-bold bg-gradient-medical bg-clip-text text-transparent">
              MedQueue
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Smart Live Queue Management System for Hospitals. 
            Book appointments, track your position, and reduce wait times with real-time updates.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              className="bg-gradient-medical hover:opacity-90 text-lg px-8 py-6"
              onClick={() => onNavigate("booking")}
            >
              <CalendarPlus className="h-5 w-5 mr-2" />
              Book Appointment
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => onNavigate("queue")}
            >
              <Users className="h-5 w-5 mr-2" />
              View Queue
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-card hover:shadow-medical transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-medical-blue-light rounded-full">
                  <Users className="h-6 w-6 text-medical-blue" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalPatients}</p>
                  <p className="text-sm text-muted-foreground">Total Patients Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-medical transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Clock className="h-6 w-6 text-medical-green" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{activePatients}</p>
                  <p className="text-sm text-muted-foreground">Currently Waiting</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-medical transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-medical-orange" />
                </div>
                <div>
                  <p className="text-2xl font-bold">15min</p>
                  <p className="text-sm text-muted-foreground">Average Wait Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card 
            className="shadow-card hover:shadow-medical transition-all duration-200 cursor-pointer"
            onClick={() => onNavigate("booking")}
          >
            <CardHeader className="text-center">
              <div className="mx-auto p-4 bg-medical-blue-light rounded-full w-fit mb-4">
                <CalendarPlus className="h-8 w-8 text-medical-blue" />
              </div>
              <CardTitle>Book Appointment</CardTitle>
              <CardDescription>
                Quick and easy appointment booking with instant token generation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="shadow-card hover:shadow-medical transition-all duration-200 cursor-pointer"
            onClick={() => onNavigate("queue")}
          >
            <CardHeader className="text-center">
              <div className="mx-auto p-4 bg-green-100 rounded-full w-fit mb-4">
                <Users className="h-8 w-8 text-medical-green" />
              </div>
              <CardTitle>Live Queue Tracking</CardTitle>
              <CardDescription>
                Real-time queue updates with ETA and position tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Queue
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="shadow-card hover:shadow-medical transition-all duration-200 cursor-pointer"
            onClick={() => onNavigate("staff")}
          >
            <CardHeader className="text-center">
              <div className="mx-auto p-4 bg-orange-100 rounded-full w-fit mb-4">
                <UserCheck className="h-8 w-8 text-medical-orange" />
              </div>
              <CardTitle>Staff Dashboard</CardTitle>
              <CardDescription>
                Comprehensive queue management tools for hospital staff
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Access Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* How it Works */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-medical-blue text-white rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold">Book</h3>
              <p className="text-muted-foreground">
                Fill out the appointment form with your details and get an instant token number
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-medical-green text-white rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold">Track</h3>
              <p className="text-muted-foreground">
                Monitor your position in the queue with real-time updates and ETA notifications
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-medical-orange text-white rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold">Visit</h3>
              <p className="text-muted-foreground">
                Receive timely notifications when it's your turn and proceed to the doctor
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}