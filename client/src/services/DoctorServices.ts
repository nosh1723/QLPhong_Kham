import axios from "axios";
import { API_ENPOINT } from "@/src/constants/LocalConst";

const API_PATH = API_ENPOINT + "/doctors";

export const  pagingDoctor = () => axios.get(API_PATH)

export const  getDoctor = (id: object) => axios.get(API_PATH + `/${id}`)