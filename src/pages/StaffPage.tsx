import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StaffControls } from "@/components/staff/staff-controls"
import { ArrowLeft, UserCheck, Stethoscope } from "lucide-react"

interface StaffPageProps {
  onNavigate: (page: string) => void
  doctors: any[]
  patients: any[]
  updatePatientStatus: (patientId: string, status: any) => void
  getQueueForDoctor: (doctorId: string) => any[]
}

export function StaffPage({ 
  onNavigate, 
  doctors, 
  patients, 
  updatePatientStatus, 
  getQueueForDoctor 
}: StaffPageProps) {
  const [selectedDoctor, setSelectedDoctor] = useState<string>(doctors[0]?.id || "")

  const doctorQueue = selectedDoctor ? getQueueForDoctor(selectedDoctor) : []
  const selectedDoctorInfo = doctors.find(d => d.id === selectedDoctor)

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
          
          <div className="flex items-center space-x-2">
            <UserCheck className="h-5 w-5 text-medical-blue" />
            <span className="font-semibold">Staff Dashboard</span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Doctor Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Stethoscope className="h-5 w-5" />
                <span>Select Doctor</span>
              </CardTitle>
              <CardDescription>
                Choose a doctor to manage their queue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map(doctor => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{doctor.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {doctor.specialization} • Avg: {doctor.avgWaitTime}min
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedDoctorInfo && (
                <div className="mt-4 p-4 bg-medical-blue-light rounded-lg">
                  <h3 className="font-semibold">{selectedDoctorInfo.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedDoctorInfo.specialization}
                  </p>
                  <p className="text-sm">
                    Current queue: {doctorQueue.length} patients
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Queue Management */}
          {selectedDoctor && (
            <StaffControls
              patients={doctorQueue}
              onStatusUpdate={updatePatientStatus}
            />
          )}
        </div>
      </div>
    </div>
  )
}