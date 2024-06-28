import axios from "axios";
import { API_ENPOINT } from "@/src/constants/LocalConst";

const API_PATH = API_ENPOINT + "/patient";

export const getPatient = (id: string) => axios.get(API_PATH + "/getById/" + id)

export const createOrUpdatePatient = (obj: object) => axios.post(API_PATH + "/createOrUpdate", obj)