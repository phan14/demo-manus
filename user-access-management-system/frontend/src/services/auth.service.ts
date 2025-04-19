import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
}

class AuthService {
  login(loginData: LoginData) {
    return axios
      .post(API_URL + "signin", loginData)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(registerData: RegisterData) {
    return axios.post(API_URL + "signup", registerData);
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  }

  isAuthenticated() {
    return !!this.getCurrentUser();
  }
}

export default new AuthService();
