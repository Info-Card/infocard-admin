import api from "./api";

class BatchService {
  getAll(query) {
    return api.get(`/v1/batches?${query}`);
  }

  get(id) {
    return api.get(`/v1/batches/${id}`);
  }

  create(data) {
    return api.post("/v1/batches", data);
  }

  update(id, data) {
    return api.patch(`/v1/batches/${id}`, data);
  }

  delete(id) {
    return api.delete(`/v1/batches/${id}`);
  }
}

export default new BatchService();
