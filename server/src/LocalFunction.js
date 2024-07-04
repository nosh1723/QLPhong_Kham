// hàm tạo mã 9 số ngẫu nhiên
exports.getCode = (arr, pre) => {
    let code = pre + Math.floor(100000000 + Math.random() * 900000000)
    arr.forEach(i => {
        if (i.code && i.code === code) code = pre + Math.floor(100000000 + Math.random() * 900000000);
    })
    return code;
}

//đặt thời gian về 0
exports.normalizeDate= (date) => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    return normalizedDate;
}