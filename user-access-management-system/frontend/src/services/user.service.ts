import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

export interface UserData {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
}

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "test/all");
  }

  getUserBoard() {
    return axios.get(API_URL + "test/user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "test/mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "test/admin", { headers: authHeader() });
  }

  getUserProfile() {
    return axios.get(API_URL + "users/profile", { headers: authHeader() });
  }

  getAllUsers() {
    return axios.get(API_URL + "users", { headers: authHeader() });
  }

  getUserById(id: number) {
    return axios.get(API_URL + `users/${id}`, { headers: authHeader() });
  }

  changePassword(oldPassword: string, newPassword: string) {
    return axios.put(
      API_URL + "users/change-password",
      { oldPassword, newPassword },
      { headers: authHeader() }
    );
  }
}

export default new UserService();
