
import { makeAutoObservable, runInAction } from "mobx";
import { workhourDoctor } from "../services/DoctorServices";
import { Workhour } from "../models/workhour";
import { Service } from "../models/service";
import { checkDateTime } from "../services/AppointmentServices";

interface initialValues {
    doctorId: string,
    patientId: string,
    service: object,
    date: Date,
    appointmentTime: Workhour,
    note: string
}

export default class ApointmentStore {
    isLoading = false
    next = 0
    workhourDoctor: Workhour[] = []
    searchObject: initialValues = {
        doctorId: "",
        patientId: "",
        service: new Service,
        date: new Date(),
        appointmentTime: new Workhour,
        note: ""
    }

    constructor() {
        makeAutoObservable(this)
    }

    getWorkhours = async (id: string) => {
        try {
            this.setIsLoading(true)
            const res = await workhourDoctor(id)

            runInAction(() => {
                this.workhourDoctor = res.data
            })

            runInAction(() => {
                this.searchObject = {
                    ...this.searchObject,
                    appointmentTime: res.data[0]
                }
            })
            
            this.setIsLoading(false)
        } catch (error) {
            this.setIsLoading(false)
            console.log('get work hour failed', error);
        }
    }

    checkDateTime = async (date: Date) => {
        try {
            const res = await checkDateTime({date})
            console.log(res);
        } catch (error) {
            console.log('check date time failed', error);
        }
    } 

    setIsLoading = (isLoading: boolean) => {
        this.isLoading = isLoading
    }

    setNext = (next: number) => {
        this.next = next
    }

    resetStore = () => {
        this.isLoading = false
        this.next = 0
        this.workhourDoctor = []
    }
}