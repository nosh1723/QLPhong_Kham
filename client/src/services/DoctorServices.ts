import axios from "axios";
import { API_ENPOINT } from "@/src/constants/LocalConst";

const API_PATH = API_ENPOINT + "/doctors";

const API_PATH_2 = API_ENPOINT + "/workhouseDoctors";

export const  pagingDoctor = () => axios.get(API_PATH)

export const  getDoctor = (id: object) => axios.get(API_PATH + `/${id}`)

export const workhourDoctor = (id: string) => axios.get(API_PATH_2 + `/getByDoctorId/${id}`)