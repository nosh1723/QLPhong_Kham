import { Doctor } from "@/src/models/doctor";
import { getDoctor, getWorkhourDoctor, pagingDoctor } from "@/src/services/DoctorServices";
import { makeAutoObservable, runInAction } from "mobx";
import { Patient } from "../models/patient";
import { Service } from "../models/service";
import { Workhour } from "../models/workhour";
import { Appointment } from "../models/appointment";


export default class HomeStore {
    pageDoctor = []
    doctor = new Doctor()
    isLoading = false
    workhourDoctor: Appointment[] = [] 
    workhourExist = new Appointment()

    constructor() {
        makeAutoObservable(this)
    }

    setWorkhourExist = (workhourExist: any) => this.workhourExist = workhourExist 


    pagingDoctor = async () => {
       try {
        const res = await pagingDoctor()
        runInAction(() => {
            this.pageDoctor = res.data
        })
        this.setDoctors(res.data)
       } catch (error) {
        console.log(error);
       }
    }

    setDoctors = (pageDoctor: any) => {
        this.pageDoctor = pageDoctor
    }

    getDoctor = async (id: any) => {
        try {
            this.setIsLoading(true)
            
            const { data } = await getDoctor(id)
            runInAction(() => {
                this.doctor = data
            })
            this.setIsLoading(false)
        } catch (error) {
            console.log(error);
            this.setIsLoading(false)
        }
    } 

    getWorkhourDoctor = async (date: any) => {
        try {
            this.setIsLoading(true)
            const { data } = await getWorkhourDoctor({doctorId: this.doctor.id, date})
            runInAction(() => {
                this.workhourDoctor = data
            })
            this.setIsLoading(false)
        } catch (error) {
            console.log(error);
            this.setIsLoading(false)
            
        }
    }

    setIsLoading = (isLoading: boolean) => {
        this.isLoading = isLoading
    }

    resetStore = () => {
        this.pageDoctor = []
        this.doctor = new Doctor()
        this.isLoading = false
        this.workhourDoctor = [] 
        this.workhourExist = new Appointment()
    }

    resetWorkhour = () => {
        this.isLoading = false
        this.workhourDoctor = [] 
        this.workhourExist = new Appointment()
    }

    resetWorkhourExist = () => {
        this.workhourExist = new Appointment()
    }
}