import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserRound, Stethoscope } from "lucide-react"

interface RoleSelectionPageProps {
  onRoleSelect: (role: 'patient' | 'staff') => void
}

export const RoleSelectionPage = ({ onRoleSelect }: RoleSelectionPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">Smart Queue System</h1>
          <p className="text-lg text-muted-foreground">Choose your role to continue</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => onRoleSelect('patient')}>
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <UserRound className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl">I'm a Patient</CardTitle>
              <CardDescription>
                Book appointments, view queue status, and track your waiting time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => onRoleSelect('patient')}>
                Continue as Patient
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => onRoleSelect('staff')}>
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <Stethoscope className="w-8 h-8 text-secondary-foreground" />
              </div>
              <CardTitle className="text-xl">I'm Hospital Staff</CardTitle>
              <CardDescription>
                Manage queues, update patient status, and monitor waiting times
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full" onClick={() => onRoleSelect('staff')}>
                Continue as Staff
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}