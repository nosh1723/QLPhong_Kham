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

export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

export function formatPhoneNumber(phoneNumber: string) {
    phoneNumber = phoneNumber.replace(/\D/g, '');

    if (phoneNumber.length === 10 && phoneNumber.startsWith('0')) return '+84' + phoneNumber.slice(1);
    else if (phoneNumber.startsWith('84') && phoneNumber.length === 11) return '+' + phoneNumber;
    else throw new Error('Số điện thoại không hợp lệ');
}


//kiểm tra thời gian so với ngày hiện tại
export const checkTime = (specificTime: Date) => {
    const nowTime = new Date().setHours(0, 0, 0, 0)
    if(nowTime > specificTime.setHours(0, 0, 0, 0)) return true
    return false
}