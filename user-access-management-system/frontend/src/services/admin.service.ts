import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/admin/";

class AdminService {
  getUserCount() {
    return axios.get(API_URL + "users/count", { headers: authHeader() });
  }

  updateUserRoles(userId: number, roles: string[]) {
    return axios.put(
      API_URL + `users/${userId}/roles`,
      roles,
      { headers: authHeader() }
    );
  }

  deleteUser(userId: number) {
    return axios.delete(API_URL + `users/${userId}`, { headers: authHeader() });
  }
}

export default new AdminService();
