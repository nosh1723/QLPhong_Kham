import { Patient } from "../models/patient";
import { createOrUpdatePatient, getPatient } from "../services/User.Service";
import { makeAutoObservable, runInAction } from "mobx";

export default class UserStore {
  searchObject = new Patient()
  patient = new Patient();
  isLoading = false

  constructor() {
    makeAutoObservable(this);
  }

  getPatient = async (email: string) => {
    try {
        this.setIsLoading(true)
        const res = await getPatient({ email });
        runInAction(() => {
            this.patient = res.data;
        });
        this.setIsLoading(false)
    } catch (error) {
        console.log("get patient failed!", error);
    }
  };

  createOrUpdatePatient = async(obj: Patient) => {
    try {
      this.setIsLoading(true)
      const res = await createOrUpdatePatient(obj)
      this.getPatient(obj.email)
      this.setIsLoading(false)
    } catch (error) {
      console.log("create or update failed!", error);
    }
  }

  setPatient = (patient: Patient) => {
    this.patient = patient
  }

  setIsLoading = (isLoading: boolean) => this.isLoading = isLoading

  resetStore = () => {
    this.searchObject = new Patient()
    this.patient = new Patient();
    this.isLoading = false
  };
}
