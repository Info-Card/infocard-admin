import ApiService from "./ApiService";

class PlatformService extends ApiService {
  getAll(page, limit) {
    return this.instance.get(`/v1/platforms?page=${page}&limit=${limit}`);
  }

  get(id) {
    return this.instance.get(`/v1/platforms/${id}`);
  }

  create(data) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    Object.entries(data).forEach((entry) => {
      const [key, value] = entry;
      if (key === "image") {
        if (value[0]) {
          formData.append("image", value[0]);
        }
      } else {
        formData.append(key, value);
      }
    });

    return this.instance.post("/v1/platforms/", formData, config);
  }

  update(id, data) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    Object.entries(data).forEach((entry) => {
      const [key, value] = entry;
      if (key === "image") {
        if (value[0]) {
          formData.append("image", value[0]);
        }
      } else {
        formData.append(key, value);
      }
    });

    return this.instance.patch(`/v1/platforms/${id}`, formData, config);
  }

  delete(id) {
    return this.instance.delete(`/v1/platforms/${id}`);
  }
}

export default new PlatformService();
