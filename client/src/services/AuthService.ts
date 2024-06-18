import axios from "axios";
import { API_ENPOINT } from "@/src/constants/LocalConst";

const API_PATH = API_ENPOINT + "/auth";

export const  register = (obj:object) => {
    const url = API_PATH + "/register"
    return axios.post(url, obj)
}

export const  login = (obj:object) => {
    const url = API_PATH + "/login"
    return axios.post(url, obj)
}

export const  verification = (email:object) => {
    const url = API_PATH + "/verification"
    return axios.post(url, email)
}
