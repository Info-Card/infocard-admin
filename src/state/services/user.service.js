import api from "./api";

class UserService {
  getAll(query) {
    return api.get(`/v1/users?${query}`);
  }

  get(id) {
    return api.get(`/v1/users/${id}`);
  }

  create(data) {
    return api.post("/v1/users", data);
  }

  update(id, data) {
    if (data.password === "") {
      delete data.password;
    }
    return api.patch(`/v1/users/${id}`, data);
  }

  delete(id) {
    return api.delete(`/v1/users/${id}`);
  }

  // deleteAll() {
  //   return http.delete(`/tutorials`);
  // }

  // findByTitle(title) {
  //   return http.get(`/tutorials?title=${title}`);
  // }
}

export default new UserService();
