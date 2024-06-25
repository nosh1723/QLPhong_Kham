
import { Auth } from "@/src/models/auth";
import { User } from "@/src/models/user";
import { login, register, verification } from "@/src/services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable, runInAction } from "mobx";
import Toast from "react-native-toast-message";

interface Values {
    email: string,
    password: string
}

export default class AuthStore {
    searchObject = new User()
    user = new Auth()
    code = null
    isLoading = false

    constructor() {
        makeAutoObservable(this);
    }

    handleRegister = async (user:object) => {
        try {
            this.setIsLoading(true)
            const {data} = await register(user)

             runInAction(() => {
                this.user = data
            })

            Toast.show({
                type: 'info',
                text1: "Đăng ký thành công!"
            })

            this.setIsLoading(false)
            return data
        } catch (error) {
            this.setIsLoading(false)
            console.log('Tạo tài khoản thất bại!!', error);
            Toast.show({
                type: 'info',
                text1:"Tài khoản đã tồn tại"
            })
        }
    }


    handleSendEmailCode = async (values:Values) => {
        try {
            this.setIsLoading(true)
            const newEmail = {
                email: values?.email
            }

            const {data} = await verification(newEmail)
            this.setIsLoading(false)

            runInAction(() => {
                this.code = data?.data?.code
            })
            this.setCode(data?.data?.code)

            Toast.show({
                type: 'success',
                text1: "Gửi mã xác thực thành công"
            })

        } catch (error) {
            this.setIsLoading(false)
            console.log("Gửi mã thất bại!!!", error);
            Toast.show({
                type: 'success',
                text1: "Gửi mã xác thực thất bại"
            })
        }
    }

    handleLogin = async (user:object) => {
        try {
            this.reset()
            this.setIsLoading(true)
            const {data} = await login(user)

            if(data?.status === 0) {
                Toast.show({
                    type: 'error',
                    text1: data?.message
                })
                this.setIsLoading(false)
                return
            }

            runInAction(() => {
                this.user = data
            })

            this.setUser(data)

            await AsyncStorage.setItem("auth", JSON.stringify(data))

            this.setIsLoading(false)

            return data
        } catch (error: any) {
            const mess = error?.response?.data?.message
            this.setIsLoading(false)
            console.log('Đăng nhập thất bại!!', error);
            Toast.show({ 
                type: 'error',
                text1: mess
            })
            return false
        }
    }

    setIsLoading = (isLoading: boolean) => {
        this.isLoading = isLoading
    }

    setCode = (code:any) => {
        this.code = code
    }

    setUser = (user:any) => {
        this.user = user
    }

    reset = () => {
        this.user = new Auth()
        this.isLoading = false
        this.code = null
        this.searchObject = new User()
    }
   
}