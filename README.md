# Hướng Dẫn Cài Đặt Dự Án

## Giới thiệu

Đây là hướng dẫn cài đặt và khởi chạy dự án . Dự án này bao gồm hai phần: **backend** và **frontend**. Hãy làm theo các bước dưới đây để cài đặt và khởi chạy cả hai phần của dự án.

## Backend

### Bước 1: Cấu Hình Backend

1. **Sửa lại cấu hình trong tệp `application.properties`**

   Mở tệp `src/main/resources/application.properties` và cập nhật các thông số cấu hình cơ sở dữ liệu theo thông tin của bạn:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/ten_cua_database
   spring.datasource.username=ten_nguoi_dung
   spring.datasource.password=mat_khau
   
2. **Tạo schema trong hệ quản trị cơ sở dữ liệu của  `mysql`**

3. Khởi chạy dự án
   ## Lưu Ý : sau khi tạo các user , cần gán các user role trong cơ sở dữ liệu tương ứng với : ROLE_ADMIN, ROLE_EDITOR,ROLE_USER.


### Bước 2: Cấu Hình Frontend

1. **Chạy lệnh sau để cài đặt các gói phụ thuộc**
    ```properties
   npm i
3. **khởi chạy ứng dụng**
   ```properties
   npm run dev

