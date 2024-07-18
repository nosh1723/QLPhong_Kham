import axios from "axios";
import { API_ENPOINT } from "@/src/constants/LocalConst";

const API_PATH = API_ENPOINT + "/appointments";

export const pagingAppointment = (obj: object) => axios.post(API_PATH + '/search-by-page', obj)

export const getAppointment = (id: string) => axios.get(API_PATH + `/${id}`)

export const checkDateTime = (obj: object) => axios.post(API_PATH + "/checkDateTime", obj)

export const bookAppointment = (obj: object) => axios.post(API_PATH + "/book", obj)

export const cancelAppoinment = (obj: object) => axios.post(API_PATH + "/cancelAppointment", obj)
