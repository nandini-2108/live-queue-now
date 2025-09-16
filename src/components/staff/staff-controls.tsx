import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, CheckCircle, X, Scan, User, Clock } from "lucide-react"
import { StatusBadge } from "@/components/ui/status-badge"

interface QueuePatient {
  id: string
  tokenNumber: string
  patientName: string
  phone: string
  caseType: string
  status: "waiting" | "inside" | "completed" | "skipped" | "sent_to_scan"
  bookedAt: Date
  eta: number
}

interface StaffControlsProps {
  patients: QueuePatient[]
  onStatusUpdate: (patientId: string, status: QueuePatient["status"]) => void
}

export function StaffControls({ patients, onStatusUpdate }: StaffControlsProps) {
  const activePatients = patients.filter(p => p.status !== "completed")
  const currentPatient = patients.find(p => p.status === "inside")

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-medical-blue" />
              <div>
                <p className="text-2xl font-bold">{activePatients.length}</p>
                <p className="text-sm text-muted-foreground">Active Patients</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-medical-orange" />
              <div>
                <p className="text-2xl font-bold">
                  {activePatients.length > 0 ? `${Math.round(activePatients.reduce((acc, p) => acc + p.eta, 0) / activePatients.length)}` : "0"}min
                </p>
                <p className="text-sm text-muted-foreground">Avg Wait Time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-medical-green" />
              <div>
                <p className="text-2xl font-bold">{patients.filter(p => p.status === "completed").length}</p>
                <p className="text-sm text-muted-foreground">Completed Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {currentPatient && (
        <Card className="border-medical-green bg-green-50">
          <CardHeader>
            <CardTitle className="text-lg">Currently Inside</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{currentPatient.patientName}</p>
                <p className="text-sm text-muted-foreground">Token: {currentPatient.tokenNumber}</p>
                <p className="text-sm text-muted-foreground">Case: {currentPatient.caseType}</p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onStatusUpdate(currentPatient.id, "completed")}
                  className="bg-green-100 border-green-300 hover:bg-green-200"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Complete
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onStatusUpdate(currentPatient.id, "sent_to_scan")}
                  className="bg-orange-100 border-orange-300 hover:bg-orange-200"
                >
                  <Scan className="h-4 w-4 mr-1" />
                  Send to Scan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Queue Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activePatients.map((patient, index) => (
              <div key={patient.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="font-mono">
                    {patient.tokenNumber}
                  </Badge>
                  <div>
                    <p className="font-medium">{patient.patientName}</p>
                    <p className="text-sm text-muted-foreground">{patient.caseType}</p>
                  </div>
                  <StatusBadge status={patient.status} />
                </div>
                
                <div className="flex space-x-1">
                  {patient.status === "waiting" && (
                    <Button 
                      size="sm" 
                      onClick={() => onStatusUpdate(patient.id, "inside")}
                      className="bg-green-100 border-green-300 hover:bg-green-200 text-green-800"
                      variant="outline"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Enter
                    </Button>
                  )}
                  
                  {patient.status === "waiting" && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onStatusUpdate(patient.id, "skipped")}
                      className="bg-red-100 border-red-300 hover:bg-red-200 text-red-800"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Skip
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            {activePatients.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No patients in queue
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}