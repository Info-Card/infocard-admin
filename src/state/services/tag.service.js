import ApiService from "./ApiService";

class TagService extends ApiService {
  getAll(query) {
    return this.instance.get(`/v1/tags?${query}`);
  }

  // get(id) {
  //   return this.instance.get(`tags/${id}`);
  // }

  create(data) {
    return this.instance.post("/v1/tags", data);
  }

  update(id, data) {
    return this.instance.patch(`/v1/tags/${id}`, data);
  }

  delete(id) {
    return this.instance.delete(`/v1/tags/${id}`);
  }

  exportCsv(batchId) {
    return this.instance.get(`/v1/tags/export-csv/${batchId}`);
  }
}

export default new TagService();
