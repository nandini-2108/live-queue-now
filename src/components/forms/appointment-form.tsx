import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, Phone, User, Stethoscope } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Doctor {
  id: string
  name: string
  specialization: string
  avgWaitTime: number
}

const doctors: Doctor[] = [
  { id: "doc1", name: "Dr. Sarah Johnson", specialization: "General Physician", avgWaitTime: 15 },
  { id: "doc2", name: "Dr. Michael Chen", specialization: "Pediatrician", avgWaitTime: 20 },
  { id: "doc3", name: "Dr. Emily Rodriguez", specialization: "OPD Specialist", avgWaitTime: 12 }
]

const caseTypes = [
  "Routine Checkup",
  "Follow-up",
  "Emergency",
  "Consultation",
  "Vaccination",
  "Lab Results"
]

interface AppointmentFormProps {
  onBookingSuccess: (patientData: any) => void
}

export function AppointmentForm({ onBookingSuccess }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    doctorId: "",
    caseType: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.patientName || !formData.phone || !formData.doctorId || !formData.caseType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      title: "Appointment Booked!",
      description: "Your appointment has been scheduled. You can now view the queue."
    })
    
    setIsSubmitting(false)
    onBookingSuccess(formData)
  }

  const selectedDoctor = doctors.find(d => d.id === formData.doctorId)

  return (
    <Card className="w-full max-w-md mx-auto shadow-medical">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <CalendarDays className="h-5 w-5 text-medical-blue" />
          <span>Book Appointment</span>
        </CardTitle>
        <CardDescription>
          Fill in your details to get a queue token
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patientName" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Patient Name</span>
            </Label>
            <Input
              id="patientName"
              placeholder="Enter your full name"
              value={formData.patientName}
              onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Phone Number</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <Stethoscope className="h-4 w-4" />
              <span>Select Doctor</span>
            </Label>
            <Select value={formData.doctorId} onValueChange={(value) => setFormData(prev => ({ ...prev, doctorId: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map(doctor => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    <div className="flex flex-col">
                      <span>{doctor.name}</span>
                      <span className="text-xs text-muted-foreground">{doctor.specialization}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedDoctor && (
              <p className="text-xs text-muted-foreground">
                Average wait time: {selectedDoctor.avgWaitTime} minutes
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Case Type</Label>
            <Select value={formData.caseType} onValueChange={(value) => setFormData(prev => ({ ...prev, caseType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select case type" />
              </SelectTrigger>
              <SelectContent>
                {caseTypes.map(caseType => (
                  <SelectItem key={caseType} value={caseType}>
                    {caseType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-medical hover:opacity-90" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}