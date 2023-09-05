import api from "./api";

class CategoryService {
  getAll(query) {
    return api.get(`/v1/categories?${query}`);
  }

  get(id) {
    return api.get(`/v1/categories/${id}`);
  }

  create(data) {
    return api.post("/v1/categories", data);
  }

  update(id, data) {
    return api.patch(`/v1/categories/${id}`, data);
  }

  delete(id) {
    return api.delete(`/v1/categories/${id}`);
  }
}

export default new CategoryService();
