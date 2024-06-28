// hàm tạo mã 9 số ngẫu nhiên
exports.getCode = (arr, pre) => {
    let code = pre + Math.floor(100000000 + Math.random() * 900000000)
    arr.forEach(i => {
        if (i.code && i.code === code) code = pre + Math.floor(100000000 + Math.random() * 900000000);
    })
    return code;
}