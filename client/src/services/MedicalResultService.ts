import axios from "axios";
import { API_ENPOINT } from "@/src/constants/LocalConst";

const API_PATH = API_ENPOINT + "/medicalreport";

export const saveOrEdit = (obj: object) => axios.post(API_PATH + '/save-or-edit', obj) 

export const getAll = () => axios.get(API_PATH)

export const getByAppId = (id: string) => axios.get(API_PATH + "/get-by-app-id/" + id)