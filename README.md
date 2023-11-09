# App android đọc truyện kdg_truyen_android

# Chức năng
    - Xem thông tin truyện - xem từng tập truyện
    - Đề xuất truyện vừa được update và có nhiều lượt đọc
    - Tìm kiếm theo tên truyện
    - Lọc theo thể loại
    - Lưu, xoá lịch sử đọc cục bộ
    - Lưu trang đang đọc cuối cùng của tập theo lịch sử đọc
    - Zoom ảnh khi đọc truyện
    - Cập nhật dữ liệu theo thời gian thực

# Cài đặt
1. Cài đặt biến môi trường react native cli https://reactnative.dev/docs/environment-setup (sử dụng jdk17: https://www.mediafire.com/file/gr82auz3zv57dix/jdk-17.0.8_windows-x64_bin.msi/file)
2. Client: https://github.com/kdg2k2/KdgTruyen_android.git
3. Server: https://github.com/kdg2k2/kdg_truyen

# Build app
1. npm i || yarn
2. npm run android || yarn android

# Đổi cổng tcp theo cổng server local (chạy server và máy ảo lên trước)
adb reverse tcp:8000 tcp:8000