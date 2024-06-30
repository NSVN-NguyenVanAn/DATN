# Hướng Dẫn Cài Đặt Dự Án

## Giới thiệu

Đây là hướng dẫn cài đặt và khởi chạy dự án . Dự án này bao gồm hai phần: **backend** và **frontend**. Hãy làm theo các bước dưới đây để cài đặt và khởi chạy cả hai phần của dự án.

## Backend

### Bước 1: Cấu Hình

1. **Sửa lại cấu hình trong tệp `application.properties`**

   Mở tệp `src/main/resources/application.properties` và cập nhật các thông số cấu hình cơ sở dữ liệu theo thông tin của bạn:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/ten_cua_database
   spring.datasource.username=ten_nguoi_dung
   spring.datasource.password=mat_khau
