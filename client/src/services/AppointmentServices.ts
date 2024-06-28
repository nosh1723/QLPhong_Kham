import axios from "axios";
import { API_ENPOINT } from "@/src/constants/LocalConst";

const API_PATH = API_ENPOINT + "/appointments";

export const pagingAppointment = () => axios.get(API_PATH)

export const getAppointment = (id: string) => axios.get(API_PATH + `/${id}`)

export const checkDateTime = (obj: object) => axios.post(API_PATH + "/checkDateTime", obj)

export const bookAppointment = (obj: object) => axios.post(API_PATH + "/book", obj)
