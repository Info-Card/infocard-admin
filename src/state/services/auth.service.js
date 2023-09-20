import ApiService from "./ApiService";
import TokenService from "./TokenService";

class AuthService extends ApiService {
  /**
   * Logs in a user with the given email and password.
   * @param {string} email - The email of the user to login.
   * @param {string} password - The password of the user to login.
   * @returns {Promise} A promise that resolves with the server response data.
   */
  login(creadentials) {
    return this.instance
      .post(`/v1/auth/login`, creadentials)
      .then((response) => {
        if (response.data && response.data.user.role === "admin") {
          TokenService.setAuthInfo(response.data);
          return response.data;
        } else {
          throw new Error("unauthorized");
        }
      });
  }
}

const authService = new AuthService();

export default authService;
