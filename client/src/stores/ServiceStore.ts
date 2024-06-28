import { getAllServiceByCate, getServiceByCategoryId, getServiceById, pagingService } from "@/src/services/ServiceServices";
import { makeAutoObservable, runInAction } from "mobx";
import { Service } from "../models/service";

// interface Service {
//     name: string,
//     price: number,
//     description: string,
//     category_Id: string
// }

export default class ServiceStore {
    pageService: Service[] = []
    selectService = new Service()
    selectServiceCat: Service[] = [] 

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

    getServiceById = async(id: string) => {
        try {
            this.setIsLoading(true)

            const res = await getServiceById(id)
    
            runInAction(() => {
                this.selectService = res.data
            })
            
            this.setIsLoading(false)
        } catch (error) {
            this.setIsLoading(false)
            console.log(error);
        }
    }

    getServiceByCategoryId = async(id :string) => {
        try {
            this.setIsLoading(true)

            const res = await getServiceByCategoryId(id)
    
            runInAction(() => {
                this.selectServiceCat = res.data.data
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
        this.selectService = new Service()
        this.isLoading = false
        this.selectServiceCat = []
    }
}