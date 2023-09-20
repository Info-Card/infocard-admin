import ApiService from "./ApiService";

class UserService extends ApiService {
  getAll(query) {
    return this.instance.get(`/v1/users?${query}`);
  }

  get(id) {
    return this.instance.get(`/v1/users/${id}`);
  }

  create(data) {
    return this.instance.post("/v1/users", data);
  }

  update(id, data) {
    if (data.password === "") {
      delete data.password;
    }
    return this.instance.patch(`/v1/users/${id}`, data);
  }

  delete(id) {
    return this.instance.delete(`/v1/users/${id}`);
  }

  exportCsv() {
    return this.instance.get(`/v1/users/csv`);
  }

  // findByTitle(title) {
  //   return http.get(`/tutorials?title=${title}`);
  // }
}

export default new UserService();
