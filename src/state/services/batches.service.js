import ApiService from "./ApiService";

class BatchService extends ApiService {
  getAll(query) {
    return this.instance.get(`/v1/batches?${query}`);
  }

  get(id) {
    return this.instance.get(`/v1/batches/${id}`);
  }

  create(data) {
    return this.instance.post("/v1/batches", data);
  }

  update(id, data) {
    return this.instance.patch(`/v1/batches/${id}`, data);
  }

  delete(id) {
    return this.instance.delete(`/v1/batches/${id}`);
  }
}

export default new BatchService();
