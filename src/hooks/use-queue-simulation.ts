import { useState, useEffect, useCallback } from "react"

interface QueuePatient {
  id: string
  tokenNumber: string
  patientName: string
  phone: string
  doctorId: string
  caseType: string
  status: "waiting" | "inside" | "completed" | "skipped" | "sent_to_scan"
  bookedAt: Date
  eta: number
  position: number
}

interface Doctor {
  id: string
  name: string
  specialization: string
  avgWaitTime: number
}

const initialDoctors: Doctor[] = [
  { id: "doc1", name: "Dr. Sarah Johnson", specialization: "General Physician", avgWaitTime: 15 },
  { id: "doc2", name: "Dr. Michael Chen", specialization: "Pediatrician", avgWaitTime: 20 },
  { id: "doc3", name: "Dr. Emily Rodriguez", specialization: "OPD Specialist", avgWaitTime: 12 }
]

const samplePatients: QueuePatient[] = [
  {
    id: "p1",
    tokenNumber: "T001",
    patientName: "John Smith",
    phone: "+1234567890",
    doctorId: "doc1",
    caseType: "Routine Checkup",
    status: "waiting",
    bookedAt: new Date(Date.now() - 30 * 60 * 1000),
    eta: 25,
    position: 1
  },
  {
    id: "p2",
    tokenNumber: "T002",
    patientName: "Mary Johnson",
    phone: "+1234567891",
    doctorId: "doc1",
    caseType: "Follow-up",
    status: "inside",
    bookedAt: new Date(Date.now() - 25 * 60 * 1000),
    eta: 0,
    position: 0
  },
  {
    id: "p3",
    tokenNumber: "T003",
    patientName: "Robert Brown",
    phone: "+1234567892",
    doctorId: "doc1",
    caseType: "Consultation",
    status: "waiting",
    bookedAt: new Date(Date.now() - 20 * 60 * 1000),
    eta: 40,
    position: 2
  },
  {
    id: "p4",
    tokenNumber: "T004",
    patientName: "Lisa Davis",
    phone: "+1234567893",
    doctorId: "doc2",
    caseType: "Vaccination",
    status: "waiting",
    bookedAt: new Date(Date.now() - 15 * 60 * 1000),
    eta: 15,
    position: 1
  }
]

export function useQueueSimulation() {
  const [doctors] = useState<Doctor[]>(initialDoctors)
  const [patients, setPatients] = useState<QueuePatient[]>(samplePatients)
  const [userToken, setUserToken] = useState<string | null>(null)

  const calculateETA = useCallback((patient: QueuePatient, allPatients: QueuePatient[]) => {
    const doctor = doctors.find(d => d.id === patient.doctorId)
    if (!doctor) return 0

    const doctorQueue = allPatients
      .filter(p => p.doctorId === patient.doctorId && p.status !== "completed")
      .sort((a, b) => a.position - b.position)

    const patientIndex = doctorQueue.findIndex(p => p.id === patient.id)
    if (patientIndex === -1) return 0

    // Calculate ETA based on patients ahead
    const patientsAhead = doctorQueue.slice(0, patientIndex)
    const baseETA = patientsAhead.length * doctor.avgWaitTime

    // Add random variation to make it more realistic
    const variation = Math.random() * 10 - 5 // ±5 minutes
    return Math.max(0, Math.round(baseETA + variation))
  }, [doctors])

  const updateETAs = useCallback((updatedPatients: QueuePatient[]) => {
    return updatedPatients.map(patient => ({
      ...patient,
      eta: patient.status === "waiting" ? calculateETA(patient, updatedPatients) : 0
    }))
  }, [calculateETA])

  const addPatient = useCallback((patientData: {
    patientName: string
    phone: string
    doctorId: string
    caseType: string
  }) => {
    const tokenNumber = `T${(Math.floor(Math.random() * 900) + 100).toString()}`
    
    // Find the highest position for this doctor
    const doctorPatients = patients.filter(p => 
      p.doctorId === patientData.doctorId && 
      p.status !== "completed"
    )
    const maxPosition = Math.max(0, ...doctorPatients.map(p => p.position))

    const newPatient: QueuePatient = {
      id: `p${Date.now()}`,
      tokenNumber,
      ...patientData,
      status: "waiting",
      bookedAt: new Date(),
      eta: 0,
      position: maxPosition + 1
    }

    setPatients(prev => {
      const updated = [...prev, newPatient]
      return updateETAs(updated)
    })

    setUserToken(tokenNumber)
    return tokenNumber
  }, [patients, updateETAs])

  const updatePatientStatus = useCallback((patientId: string, newStatus: QueuePatient["status"]) => {
    setPatients(prev => {
      const updated = prev.map(patient => {
        if (patient.id === patientId) {
          if (newStatus === "sent_to_scan") {
            // Move to end of queue for the same doctor
            const doctorPatients = prev.filter(p => 
              p.doctorId === patient.doctorId && 
              p.status !== "completed" && 
              p.id !== patientId
            )
            const maxPosition = Math.max(0, ...doctorPatients.map(p => p.position))
            return { ...patient, status: newStatus, position: maxPosition + 1 }
          }
          return { ...patient, status: newStatus }
        }
        return patient
      })

      return updateETAs(updated)
    })
  }, [updateETAs])

  const getQueueForDoctor = useCallback((doctorId: string) => {
    return patients
      .filter(p => p.doctorId === doctorId && p.status !== "completed")
      .sort((a, b) => {
        if (a.status === "inside") return -1
        if (b.status === "inside") return 1
        return a.position - b.position
      })
  }, [patients])

  const getUserQueue = useCallback(() => {
    if (!userToken) return { patient: null, queue: [], position: 0 }

    const userPatient = patients.find(p => p.tokenNumber === userToken)
    if (!userPatient) return { patient: null, queue: [], position: 0 }

    const queue = getQueueForDoctor(userPatient.doctorId)
    const position = queue.findIndex(p => p.id === userPatient.id) + 1

    return { patient: userPatient, queue, position }
  }, [userToken, patients, getQueueForDoctor])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPatients(prev => updateETAs(prev))
    }, 30000) // Update ETAs every 30 seconds

    return () => clearInterval(interval)
  }, [updateETAs])

  return {
    doctors,
    patients,
    userToken,
    addPatient,
    updatePatientStatus,
    getQueueForDoctor,
    getUserQueue
  }
}