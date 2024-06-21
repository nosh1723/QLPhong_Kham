import axios from "axios";
import { API_ENPOINT } from "@/src/constants/LocalConst";

const API_PATH = API_ENPOINT + "/services";

export const pagingService = () => axios.get(API_PATH + "/services")

export const getServiceByCategoryId = (id: string) => axios.get(API_PATH + `/servicesCategoryById/:${id}`)