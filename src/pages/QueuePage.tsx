import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QueueItem } from "@/components/queue/queue-item"
import { ArrowLeft, Users, Clock, Bell, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface QueuePageProps {
  onNavigate: (page: string) => void
  userQueue: {
    patient: any
    queue: any[]
    position: number
  }
}

export function QueuePage({ onNavigate, userQueue }: QueuePageProps) {
  const [lastNotificationTime, setLastNotificationTime] = useState<number | null>(null)
  const { toast } = useToast()
  const { patient, queue, position } = userQueue

  useEffect(() => {
    if (patient && patient.eta <= 5 && patient.eta > 0) {
      const now = Date.now()
      // Only show notification if it's been more than 2 minutes since last one
      if (!lastNotificationTime || now - lastNotificationTime > 2 * 60 * 1000) {
        toast({
          title: "Almost Your Turn!",
          description: `You'll be called in approximately ${patient.eta} minutes.`,
          duration: 8000,
        })
        setLastNotificationTime(now)
      }
    }
  }, [patient?.eta, lastNotificationTime, toast])

  if (!patient) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-bold mb-2">No Active Appointment</h2>
            <p className="text-muted-foreground mb-4">
              You don't have an active appointment. Please book one first.
            </p>
            <Button onClick={() => onNavigate("booking")}>
              Book Appointment
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const doctor = {
    name: patient.doctorId === "doc1" ? "Dr. Sarah Johnson" : 
          patient.doctorId === "doc2" ? "Dr. Michael Chen" : "Dr. Emily Rodriguez",
    specialization: patient.doctorId === "doc1" ? "General Physician" : 
                   patient.doctorId === "doc2" ? "Pediatrician" : "OPD Specialist"
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate("home")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
          
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Auto-refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Your Status Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-medical border-medical-blue">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {patient.tokenNumber}
                  </Badge>
                </CardTitle>
                <CardDescription>Your Token Number</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="font-semibold">{patient.patientName}</p>
                  <p className="text-sm text-muted-foreground">{doctor.name}</p>
                  <p className="text-xs text-muted-foreground">{doctor.specialization}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Position in Queue:</span>
                    <Badge variant="secondary">{position}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Estimated Wait:</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span className="font-medium">{patient.eta} min</span>
                    </div>
                  </div>
                </div>

                {patient.eta <= 10 && patient.eta > 0 && (
                  <div className="bg-orange-100 border border-orange-200 rounded-lg p-3 text-center">
                    <Bell className="h-5 w-5 mx-auto mb-1 text-orange-600" />
                    <p className="text-sm font-medium text-orange-800">
                      You're almost up! Be ready in {patient.eta} minutes.
                    </p>
                  </div>
                )}

                {patient.status === "inside" && (
                  <div className="bg-green-100 border border-green-200 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-green-800">
                      It's your turn! Please proceed to the doctor's office.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Queue Display */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Live Queue - {doctor.name}</span>
                </CardTitle>
                <CardDescription>
                  Current queue status • Updates automatically
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {queue.map((queuePatient, index) => (
                    <QueueItem
                      key={queuePatient.id}
                      tokenNumber={queuePatient.tokenNumber}
                      patientName={queuePatient.patientName}
                      status={queuePatient.status}
                      eta={queuePatient.eta}
                      isCurrentUser={queuePatient.id === patient.id}
                      position={index + 1}
                    />
                  ))}
                  
                  {queue.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No patients in queue</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}