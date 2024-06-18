# Chạy máy chủ với Nodemon

## Cài đặt

1. **Cài đặt các phụ thuộc từ `package.json`**: 
   - Mở Terminal và di chuyển đến thư mục dự án.
   - Chạy lệnh sau để cài đặt các phụ thuộc từ `package.json`:
     ```
     npm i
     ```
   hoặc
     ```
     npm install
     ```

2. **Cài đặt Nodemon**: 
   - Mở Terminal và di chuyển đến thư mục dự án.
   - Chạy lệnh sau để cài đặt Nodemon:
     ```
     npm install -g nodemon
     ```

## Chạy máy chủ

1. **Bắt đầu máy chủ với Nodemon**: 
   - Sau khi cài đặt, bạn có thể bắt đầu máy chủ bằng lệnh:
     ```
     nodemon
     ```
   - Nodemon sẽ tự động khởi động lại máy chủ khi phát hiện thay đổi trong mã nguồn.

2. **Truy cập máy chủ**: 
   - Mở trình duyệt web và truy cập địa chỉ `http://localhost:5000`.
   - Bạn sẽ thấy trang web hoặc thông điệp chào mừng từ máy chủ của bạn.
