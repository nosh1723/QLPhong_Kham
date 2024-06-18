import moment from "moment";

export function getDate(date: any, titleNoDate = '', stringFormate = 'DD/MM/YYYY') {
    return (date && moment(date).isValid()) ? moment(date).format(stringFormate) : titleNoDate;
};

export function getTime(date: any, titleNoDate = '', stringFormate = 'HH:mm') {
    return (date && moment(date).isValid()) ? moment(date).format(stringFormate) : titleNoDate;
};

export function getDateTime(date: any, titleNoDate = '', stringFormate = 'DD/MM/YYYY HH:mm') {
    return (date && moment(date).isValid()) ? moment(date).format(stringFormate) : titleNoDate;
};

export function getDateTimeFormat(date: any) {
    return (date ? (moment(date).hour() + " giờ " + moment(date).minute() + " phút, ngày " + moment(date).date() + " tháng " + (moment(date).month() + 1) + " năm " + moment(date).year()) : "....giờ......phút, ngày......tháng.............năm........");
};

export function getTimeDate(date: any) {
    return (date ? (moment(date).hour() + ":" + moment(date).minute() + ", Ngày " + moment(date).date() + " tháng " + (moment(date).month() + 1) + " năm " + moment(date).year()) : ".... : ......, Ngày......tháng.............năm........");
};

export function getDateFormat(date: any) {
    return (date ? ("Ngày " + moment(date).date() + " tháng " + (moment(date).month() + 1) + " năm " + moment(date).year()) : "Ngày ...... tháng ............. năm ........");
};

export function getGenderFomat(gender: string) {
    return gender === "M" ? "Nam" : "Nữ"
}