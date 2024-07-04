import { Doctor } from "./doctor"
import { Patient } from "./patient"
import { Service } from "./service"
import { Workhour } from "./workhour"

interface appointment {
    _id: string,
    doctor: Doctor,
    patient: Patient,
    service: Service,
    workhour: Workhour,
    date: Date,
    code: string,
    note: string,
    status: number,
    serialNumber: number
}

export class Appointment implements appointment {
    _id = ""
    doctor = new Doctor()
    patient = new Patient()
    service = new Service()
    workhour = new Workhour()
    date = new Date()
    code = ""
    note = ""
    status = 0
    serialNumber = 0
}