import ApiService from "./ApiService";

class CategoryService extends ApiService {
  getAll(query) {
    return this.instance.get(`/v1/categories?${query}`);
  }

  get(id) {
    return this.instance.get(`/v1/categories/${id}`);
  }

  create(data) {
    return this.instance.post("/v1/categories", data);
  }

  update(id, data) {
    return this.instance.patch(`/v1/categories/${id}`, data);
  }

  delete(id) {
    return this.instance.delete(`/v1/categories/${id}`);
  }
}

export default new CategoryService();
