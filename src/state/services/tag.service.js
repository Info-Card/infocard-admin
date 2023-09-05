import api from "./api";

class TagService {
  getAll(query) {
    return api.get(`/v1/tags?${query}`);
  }

  // get(id) {
  //   return api.get(`tags/${id}`);
  // }

  create(data) {
    return api.post("/v1/tags", data);
  }

  update(id, data) {
    return api.patch(`/v1/tags/${id}`, data);
  }

  delete(id) {
    return api.delete(`/v1/tags/${id}`);
  }
}

export default new TagService();
