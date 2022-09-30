import api from './api';

class BatchService {
  getAll(page, limit) {
    return api.get(`batches?page=${page}&limit=${limit}`);
  }

  get(id) {
    return api.get(`batches/${id}`);
  }

  create(data) {
    return api.post('batches', data);
  }

  update(id, data) {
    return api.patch(`batches/${id}`, data);
  }

  delete(id) {
    return api.delete(`batches/${id}`);
  }
}

export default new BatchService();
