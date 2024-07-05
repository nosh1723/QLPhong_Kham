import { makeAutoObservable, runInAction } from "mobx";
import { getAll, getByAppId, saveOrEdit } from "../services/MedicalResultService";
import Toast from "react-native-toast-message";
import { MedicalRecord } from "../models/medicalRecord";


export default class HomeStore {
    isLoading = false
    hasDisable = false
    selectMedicalRecord = new MedicalRecord()
    listMedicalReport: MedicalRecord[] = [] 

    constructor() {
        makeAutoObservable(this)
    }

    getAllMedicalReport = async() => {
        try {
            this.setIsLoading(true)
            const {data} = await getAll()

            runInAction(() => {
                this.listMedicalReport = data
            })
            this.setIsLoading(false)
        } catch (error) {
            this.setIsLoading(false)
            console.log('Lấy dữ liệu có lỗi', error);
        }
    }

    saveOrEdit = async(obj: object) => {
        try {
            this.setIsLoading(true)
            const {data} = await saveOrEdit(obj)
            const id = data._id
            this.getMedicalRecord(id)
            Toast.show({
                type: 'success',
                text1: 'Lưu bệnh án thành công'
            })
            this.setIsLoading(false)
        } catch (error) {
            this.setIsLoading(false)
            console.log('loi ket thuc', error);
            Toast.show({
                type: 'error',
                text1: 'Lưu bệnh án thất bại'
            })
        }
    }

    getMedicalRecord = async (id: string) => {
        try {
            this.setIsLoading(true)
            const {data} = await getByAppId(id)

            runInAction(() => {
                this.selectMedicalRecord = data
            })

            this.setDisable()
 
            this.setIsLoading(false)
        } catch (error) {
            this.setIsLoading(false)
            console.log('Lấy dữ liệu có lỗi', error);
        }
    }

    setSelectMedicalRecord = () => this.selectMedicalRecord = new MedicalRecord()


    setIsLoading = (isLoading: boolean) => {
        this.isLoading = isLoading
    }

    setDisable = () => this.hasDisable = true

    resetStore = () => {
        this.isLoading = false
        this.hasDisable = false
        this.selectMedicalRecord = new MedicalRecord()
        this.listMedicalReport = []
    }
}