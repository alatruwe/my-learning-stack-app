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

  postEntry(entry) {
    return fetch(`${config.API_ENDPOINT}/new-entry`, {
      method: "POST",
      headers: {
        "content-type": "application/json",

        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(entry),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default EntriesApiService;
