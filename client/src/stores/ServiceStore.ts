import { getAllServiceByCate, pagingService } from "@/src/services/ServiceServices";
import { makeAutoObservable, runInAction } from "mobx";
import { Service } from "../models/service";

export default class ServiceStore {
    pageService: Service[] = []
    service = null
    listServiceByCate = []
    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    pagingService = async () => {
       try {
        this.setIsLoading(true)

        const res = await pagingService()

        runInAction(() => {
            this.pageService = res.data
        })
        
        this.setIsLoading(false)

       } catch (error) {
        this.setIsLoading(false)
        console.log(error);
       }
    }

    pagingServiceByCate = async() => {
        try {
            this.setIsLoading(true)
    
            const res = await getAllServiceByCate()
    
            runInAction(() => {
                this.listServiceByCate = res.data
            })
            
            this.setIsLoading(false)
            
        } catch (error) {
            this.setIsLoading(false)
            console.log(error);
        }
    }

    setService = (data: any) => {
        this.pageService = data
    }

    setIsLoading = (isLoading: boolean) => this.isLoading = isLoading

    resetStore = () => {
        this.pageService = []
        this.service = null
        this.isLoading = false
    }
}