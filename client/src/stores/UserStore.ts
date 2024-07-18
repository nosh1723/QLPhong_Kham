import Toast from "react-native-toast-message";
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

  getPatient = async (id: string) => {
    try {
        this.setIsLoading(true)
        const res = await getPatient(id);
        runInAction(() => {
            this.patient = {
              ...this.patient,
              ...res.data
            }
        });
        this.setIsLoading(false)
    } catch (error) {
      this.setIsLoading(false)
        console.log("get patient failed!", error);
    }
  };

  createOrUpdatePatient = async(obj: any) => {
    try {
      this.setIsLoading(true)
      const res = await createOrUpdatePatient(obj)
      this.getPatient(res.data.user_id)
      this.setIsLoading(false)
      if(obj?._id){
        Toast.show({
          type: "success",
          text1: "Sửa thông tin cá nhân thành công !"
        })
      }
    } catch (error) {
      this.setIsLoading(false)
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
