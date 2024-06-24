import axios from "axios";
import { API_ENPOINT } from "@/src/constants/LocalConst";

const API_PATH = API_ENPOINT + "/appointments";

export const checkDateTime = (obj: object) => axios.post(API_PATH + "/checkDateTime", obj)

export const bookAppointment = (obj: object) => axios.post(API_PATH + "/book", obj)
