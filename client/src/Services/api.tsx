import axios, { type AxiosInstance } from "axios";

class ApiServices {
  axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
    });

    // Add interceptor to include JWT token
    this.axiosInstance.interceptors.request.use((config) => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const { jwt } = JSON.parse(storedUser);
          if (jwt) {
            config.headers.Authorization = `Bearer ${jwt}`;
            console.log(
              "API Request:",
              config.method?.toUpperCase(),
              config.url,
              "with Token"
            );
          } else {
            console.log(
              "API Request:",
              config.method?.toUpperCase(),
              config.url,
              "NO TOKEN FOUND"
            );
          }
        } else {
          console.log(
            "API Request:",
            config.method?.toUpperCase(),
            config.url,
            "NO USER FOUND IN STORAGE"
          );
        }
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
      }
      return config;
    });
  }

  async getData(url: string): Promise<any> {
    const res = await this.axiosInstance.get(url);
    return res.data;
  }
  async postData(url: string, payload: any): Promise<any> {
    const res = await this.axiosInstance.post(url, payload);
    return res.data;
  }
  async putData(url: string, payload: any): Promise<any> {
    const res = await this.axiosInstance.put(url, payload);
    return res.data;
  }
  async deleteData(url: string): Promise<any> {
    const res = await this.axiosInstance.delete(url);
    return res.data;
  }
}

export default ApiServices;
