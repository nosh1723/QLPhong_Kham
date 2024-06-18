import { pagingService } from "@/src/services/ServiceServices";
import { makeAutoObservable, runInAction } from "mobx";

export default class ServiceStore {
    pageService = []
    service = null

    constructor() {
        makeAutoObservable(this)
    }

    pagingService = async () => {
       try {
        const res = await pagingService()
        runInAction(() => {
            this.pageService = res.data
        })
        this.setService(res.data)
       } catch (error) {
        console.log(error);
       }
    }

    setService = (data: any) => {
        this.pageService = data
    }

    resetStore = () => {
        this.pageService = []
        this.service = null
    }
}