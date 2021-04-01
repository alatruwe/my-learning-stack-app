import TokenService from "./token-services";
import config from "../config";

const ProfileApiService = {
  getProfile() {
    return fetch(`${config.API_ENDPOINT}/profile`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  postProfile(profile) {
    return fetch(`${config.API_ENDPOINT}/profile`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(profile),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default ProfileApiService;
