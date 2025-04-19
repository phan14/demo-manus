# User Access Management System

Hệ thống Quản lý User toàn diện với JWT, RBAC, Cache, và Swagger.

## Tính năng chính

- Đăng ký & đăng nhập người dùng
- Xác thực bằng JWT
- Phân quyền dựa trên vai trò (RBAC) với mô hình Role-Permission
- Mã hóa mật khẩu bằng BCrypt
- Ghi log có cấu trúc với Logback
- Cấu hình linh hoạt với nhiều profile trong application.yaml
- Quản lý database migration với Flyway
- Unit test với JUnit 5 và Mockito
- Tài liệu API với Springdoc OpenAPI (Swagger 3)
- Đóng gói ứng dụng với Docker và Docker Compose
- Caching với Caffeine (in-memory) và Redis (distributed)

## Tech Stack

- Backend: Java 17, Spring Boot 3.x
- Security: Spring Security + JWT
- Database: PostgreSQL
- Migration: Flyway
- Cache: Caffeine (local), Redis (distributed)
- API Documentation: Springdoc OpenAPI
- Logging: Logback
- Testing: JUnit 5, Mockito
- Containerization: Docker, Docker Compose

## Cấu trúc dự án

```
user-access-management-system/
├── src/
│   ├── main/
│   │   ├── java/com/example/usermanagement/
│   │   │   ├── aspect/            # Logging aspects
│   │   │   ├── config/            # Configuration classes
│   │   │   ├── controller/        # REST controllers
│   │   │   ├── dto/               # Data Transfer Objects
│   │   │   ├── exception/         # Exception handling
│   │   │   ├── model/             # Entity models
│   │   │   ├── repository/        # Data repositories
│   │   │   ├── security/          # Security configuration
│   │   │   ├── service/           # Business services
│   │   │   └── util/              # Utility classes
│   │   └── resources/
│   │       ├── db/migration/      # Flyway migration scripts
│   │       ├── application.yaml   # Application configuration
│   │       └── logback-spring.xml # Logging configuration
│   └── test/                      # Unit tests
├── Dockerfile                     # Docker build file
├── docker-compose.yml             # Docker Compose configuration
├── .env                           # Environment variables
├── start-dev.sh                   # Development startup script
└── pom.xml                        # Maven project configuration
```

## Cách sử dụng

### Yêu cầu

- Java 17 hoặc cao hơn
- Maven
- Docker và Docker Compose

### Khởi động với Docker

1. Cấp quyền thực thi cho script khởi động:
   ```bash
   chmod +x start-dev.sh
   ```

2. Chạy script khởi động:
   ```bash
   ./start-dev.sh
   ```

Script này sẽ:
- Kiểm tra và tạo file .env nếu cần
- Dừng các container đang chạy
- Build ứng dụng
- Khởi động các container
- Hiển thị thông tin truy cập

### Truy cập ứng dụng

- **API**: http://localhost:8080/api
- **Swagger UI**: http://localhost:8080/api/swagger-ui.html
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## Các API chính

### Authentication

- `POST /api/auth/signup`: Đăng ký người dùng mới
- `POST /api/auth/signin`: Đăng nhập và nhận JWT token

### User Management

- `GET /api/users`: Lấy danh sách người dùng (Admin)
- `GET /api/users/{id}`: Lấy thông tin người dùng theo ID (Admin hoặc chính người dùng)
- `GET /api/users/profile`: Lấy thông tin người dùng hiện tại
- `PUT /api/users/change-password`: Thay đổi mật khẩu
- `DELETE /api/users/{id}`: Xóa người dùng (Admin)

### Admin Operations

- `PUT /api/admin/users/{id}/roles`: Cập nhật vai trò của người dùng
- `GET /api/admin/users/count`: Lấy tổng số người dùng

### Test Endpoints

- `GET /api/test/all`: Công khai
- `GET /api/test/user`: Yêu cầu ROLE_USER
- `GET /api/test/mod`: Yêu cầu ROLE_MODERATOR
- `GET /api/test/admin`: Yêu cầu ROLE_ADMIN

## Mô hình phân quyền (RBAC)

Hệ thống sử dụng mô hình Role-Permission:

- **Roles**: ADMIN, MODERATOR, USER
- **Permissions**: READ_USER, WRITE_USER, DELETE_USER, READ_ALL_USERS, MANAGE_ROLES, ACCESS_ADMIN_PANEL, ACCESS_MODERATOR_PANEL, ACCESS_USER_PANEL

Mỗi vai trò được gán các quyền cụ thể:
- ROLE_USER: READ_USER, ACCESS_USER_PANEL
- ROLE_MODERATOR: READ_USER, WRITE_USER, READ_ALL_USERS, ACCESS_USER_PANEL, ACCESS_MODERATOR_PANEL
- ROLE_ADMIN: Tất cả các quyền

## Cấu hình

Hệ thống hỗ trợ nhiều profile:
- **dev**: Phát triển local với in-memory cache (Caffeine)
- **test**: Môi trường test với H2 database
- **prod**: Sản phẩm với distributed cache (Redis)

## Tài liệu API

Tài liệu API được tạo tự động bằng Springdoc OpenAPI và có thể truy cập tại `/api/swagger-ui.html`
