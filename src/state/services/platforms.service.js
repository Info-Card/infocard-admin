import api from "./api";

class PlatformService {
  getAll(page, limit) {
    return api.get(`/v1/platforms?page=${page}&limit=${limit}`);
  }

  get(id) {
    return api.get(`/v1/platforms/${id}`);
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

    return api.post("/v1/platforms/", formData, config);
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

    return api.patch(`/v1/platforms/${id}`, formData, config);
  }

  delete(id) {
    return api.delete(`/v1/platforms/${id}`);
  }
}

export default new PlatformService();
