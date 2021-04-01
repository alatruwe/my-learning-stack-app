import config from "../config";
import TokenService from "./token-services";
import IdleService from "./idle-service";

const AuthApiService = {
  postLogin(credentials) {
    return fetch(`${config.API_ENDPOINT}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((res) => {
        /*
        whenever a logint is performed:
        1. save the token in local storage
        2. queue auto logout when the user goes idle
        3. queue a call to the refresh endpoint based on the JWT's exp value
      */
        TokenService.saveAuthToken(res.authToken);
        IdleService.regiserIdleTimerResets();
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthApiService.postRefreshToken();
        });
        return res;
      });
  },

  postRefreshToken() {
    return fetch(`${config.API_ENDPOINT}/login/refresh`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((res) => {
        /*
          similar logic to whenever a user logs in, the only differences are:
          - we don't need to queue the idle timers again as the user is already logged in.
          - we'll catch the error here as this refresh is happening behind the scenes
        */
        TokenService.saveAuthToken(res.authToken);
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthApiService.postRefreshToken();
        });
        return res;
      })
      .catch((err) => {
        //console.log("refresh token request error");
        console.error(err);
      });
  },

  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default AuthApiService;
