import TokenService from "./token-services";
import config from "../config";

const EntriesApiService = {
  getEntries() {
    return fetch(`${config.API_ENDPOINT}/dashboard`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default EntriesApiService;
