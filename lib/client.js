"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Axios = require('axios');

const Config = require('./config');

class YouFormClient {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      token: null,
      secret_key: null,
      api_access_token: null
    };

    _defineProperty(this, "setAuthToken", async (_ref) => {
      let {
        email,
        password
      } = _ref;
      const result = await Axios({
        url: "".concat(Config.YOUFORM_HOST).concat(Config.YOUFORM_ENDPOINT_LOGIN),
        method: 'POST',
        data: {
          email,
          password
        }
      });
      const {
        status,
        data,
        error
      } = result;

      if (status < 400 && error == null) {
        const {
          token,
          secret_key,
          api_access_token
        } = data;
        this.token = token;
        this.secret_key = secret_key;
        this.api_access_token = api_access_token;
        return data;
      }

      throw new Error("Error during server connection.");
    });

    this.token = options.token || null;
    this.secret_key = options.secret_key || null;
    this.api_access_token = options.api_access_token || null;
  }

}

module.exports = YouFormClient;