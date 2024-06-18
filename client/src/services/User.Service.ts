import axios from "axios";
import { API_ENPOINT } from "@/src/constants/LocalConst";

const API_PATH = API_ENPOINT + "/patient";

export const getPatient = (obj: object) => axios.post(API_PATH + "/getPatientByEmail", obj)

export const createOrUpdatePatient = (obj: object) => axios.post(API_PATH + "/createOrUpdatePatient", obj)