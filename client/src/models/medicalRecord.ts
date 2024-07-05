import { Appointment } from "./appointment"

export class MedicalRecord {
    _id = ''
    appointment = new Appointment()
    results = Array<MedicalResult>()
    reExamination = false
    dateReExam = new Date()
}
 
export class MedicalResult {
    _id = ''
    description = ''
    medicalReportId = ''
}