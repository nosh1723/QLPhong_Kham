
import { isAction, makeAutoObservable, runInAction } from "mobx";
import { workhourDoctor } from "../services/DoctorServices";
import { Workhour, WorkhourDoctor } from "../models/workhour";
import { Service } from "../models/service";
import { bookAppointment, checkDateTime, getAppointment, pagingAppointment } from "../services/AppointmentServices";
import Toast from "react-native-toast-message";

interface initialValues {
    doctorId: string,
    patientId: string,
    service: object,
    date: Date,
    appointmentTime: Workhour,
    note: string
}

interface workhourResult{
    status: number,
    workhour: WorkhourDoctor[]
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
    workhourResult: workhourResult = {
        status: 0,
        workhour: []
    }
    bookAppointment = {}
    pageAppointment = []
    selectAppointment = {}

    constructor() {
        makeAutoObservable(this)
    }

    getAppointment = async (id: string) => {
        try {
            this.setIsLoading(true)
            const res = await getAppointment(id)

            runInAction(() => {
                this.selectAppointment = res.data
            })
            this.setIsLoading(false)
        } catch (error) {
            this.setIsLoading(false)
            console.log('lấy lịch khám có lỗi', error);
        }
    }

    pagingAppointment = async () => {
        try {
            this.setIsLoading(true)
            const res = await pagingAppointment()

            runInAction(() => {
                this.pageAppointment = res.data
            })

            this.setIsLoading(false)
        } catch (error) {
            this.setIsLoading(false)
            console.log("Lấy lịch hẹn thất bại", error);
        }
    }

    handleBookAppointment = async (obj: object) => {
        try {
            this.setIsLoading(true)
            const res = await bookAppointment(obj)
            runInAction(() => {
                this.bookAppointment = res.data
            }) 
            this.setIsLoading(false)
            return res.data
        } catch (error) {
            this.setIsLoading(false)
            console.log('book appointment failed', error);
        }
    }

    getWorkhours = async (id: string) => {
        try {
            this.setIsLoading(true)
            const res = await workhourDoctor(id)

            runInAction(() => {
                this.workhourDoctor = res.data
            })
            this.setIsLoading(false)
        } catch (error) {
            this.setIsLoading(false)
            console.log('get work hour failed', error);
        }
    }

    checkDateTime = async (date: Date) => {
        try {
            this.setIsLoading(true)
            const res = await checkDateTime({date})
            runInAction(() => {
                this.workhourResult = res.data
            })
            this.setIsLoading(false)
        } catch (error) {
            this.setIsLoading(false)
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
        this.workhourResult = {
            status: 0,
            workhour: []
        }
        this.bookAppointment = {}
        this.searchObject = {
            doctorId: "",
            patientId: "",
            service: new Service,
            date: new Date(),
            appointmentTime: new Workhour,
            note: ""
        }
    }
}