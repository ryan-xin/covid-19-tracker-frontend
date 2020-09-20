import axios from "axios";

const USER_LOGIN_URL = "http://localhost:1337/user/login";
const USER_SIGNUP_URL = "http://localhost:1337/user/signup";

class AuthService {
  login(email, password) {
    return axios.post(USER_LOGIN_URL, {
        email,
        password
      })
    .then(res => {
      if (res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, email, password) {
    return axios.post(USER_SIGNUP_URL, {
      name,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();