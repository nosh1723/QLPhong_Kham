import { Platform } from "react-native"
import { colors } from "./Colors"

export const API_ENPOINT = "http://30.90.0.106:5000/api"

export const isIos = Platform.OS === "ios"

export const SCHEDULE_EXAM_STATUS = [
    {
        status: 1,
        name: 'Đã đặt lịch',
        color: colors["green-200"],
        bgColor: '#E0FBE2',
        borderColor: colors["green-200"]
    },
    {
        status: 0,
        name: 'Lịch bị hủy',
        color: colors.red,
        bgColor: '#fbe9dd',
        borderColor: colors.red
    },
    {
        status: 2,
        name: 'Lịch hết hạn',
        color: colors.orange,
        bgColor: '#F3F6D0',
        borderColor: colors.orange
    },
    {
        status: 3,
        name: 'Đã hoàn thành',
        color: colors.blue,
        bgColor: "rgba(222, 235, 246, .7)",
        borderColor: colors.blue
    }
]
