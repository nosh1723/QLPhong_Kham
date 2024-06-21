
import { makeAutoObservable, runInAction } from "mobx";
import { workhourDoctor } from "../services/DoctorServices";
import { Workhour } from "../models/workhour";

export default class ApointmentStore {
    isLoading = false
    next = 0
    workhourDoctor: Workhour[] = []

    constructor() {
        makeAutoObservable(this)
    }

    getWorkhours = async(id: string) => {
        try {
            this.setIsLoading(true)
            const res = await workhourDoctor(id)

            runInAction(() => {
                this.workhourDoctor = res.data
            })

            this.setIsLoading(false)
        } catch (error) {
            this.setIsLoading(false)
            console.log('get work hour failed',error);
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