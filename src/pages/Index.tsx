import { useState } from "react"
import { Navbar } from "@/components/ui/navbar"
import { HomePage } from "@/pages/HomePage"
import { BookingPage } from "@/pages/BookingPage"
import { QueuePage } from "@/pages/QueuePage"
import { StaffPage } from "@/pages/StaffPage"
import { useQueueSimulation } from "@/hooks/use-queue-simulation"

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home")
  const {
    doctors,
    patients,
    userToken,
    addPatient,
    updatePatientStatus,
    getQueueForDoctor,
    getUserQueue
  } = useQueueSimulation()

  const handleBookingSuccess = (patientData: any) => {
    addPatient(patientData)
    setCurrentPage("queue")
  }

  const totalPatients = patients.length
  const activePatients = patients.filter(p => p.status !== "completed").length
  const userQueue = getUserQueue()

  const renderPage = () => {
    switch (currentPage) {
      case "booking":
        return (
          <BookingPage
            onNavigate={setCurrentPage}
            onBookingSuccess={handleBookingSuccess}
          />
        )
      case "queue":
        return (
          <QueuePage
            onNavigate={setCurrentPage}
            userQueue={userQueue}
          />
        )
      case "staff":
        return (
          <StaffPage
            onNavigate={setCurrentPage}
            doctors={doctors}
            patients={patients}
            updatePatientStatus={updatePatientStatus}
            getQueueForDoctor={getQueueForDoctor}
          />
        )
      default:
        return (
          <HomePage
            onNavigate={setCurrentPage}
            totalPatients={totalPatients}
            activePatients={activePatients}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {renderPage()}
    </div>
  )
};

export default Index;
