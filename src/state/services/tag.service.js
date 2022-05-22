import api from './api';

class TagService {
  getAll(batchId) {
    return api.get(`tags?batchId=${batchId}`);
  }
  getBatches() {
    return api.get(`tags/batches`);
  }
  get(id) {
    return api.get(`tags/${id}`);
  }

  create(data) {
    return api.post('tags', data);
  }
}

export default new TagService();
