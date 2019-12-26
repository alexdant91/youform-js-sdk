"use strict";

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Axios = require('axios');

const Config = require('./config');

class YouFormClient {
  constructor() {
    var _this = this;

    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      token: null,
      secret_key: null,
      api_access_token: null
    };

    _defineProperty(this, "clearData", () => {
      this.newData = [];
      return this;
    });

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

    _defineProperty(this, "find", async function (alias) {
      let query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const result = await Axios({
        url: "".concat(Config.YOUFORM_HOST).concat(Config.YOUFORM_ENDPOINT_FIND).concat(alias),
        method: 'POST',
        headers: {
          "token": _this.token,
          "secret-key": _this.secret_key,
          "api-access-token": _this.api_access_token
        },
        data: query
      });
      return result.data;
    });

    _defineProperty(this, "paginate", async function (alias) {
      let query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const result = await Axios({
        url: "".concat(Config.YOUFORM_HOST).concat(Config.YOUFORM_ENDPOINT_PAGINATE).concat(alias),
        method: 'POST',
        headers: {
          "token": _this.token,
          "secret-key": _this.secret_key,
          "api-access-token": _this.api_access_token
        },
        data: query
      });
      return result.data;
    });

    _defineProperty(this, "findOne", async (alias, query) => {
      const result = await Axios({
        url: "".concat(Config.YOUFORM_HOST).concat(Config.YOUFORM_ENDPOINT_FIND_ONE).concat(alias),
        method: 'POST',
        headers: {
          "token": this.token,
          "secret-key": this.secret_key,
          "api-access-token": this.api_access_token
        },
        data: query
      });
      return result.data;
    });

    _defineProperty(this, "data", data => {
      if (Array.isArray(data)) {
        this.newData = {
          data
        };
        return this;
      } else if (!Array.isArray(data) && typeof data === "object") {
        this.newData = _objectSpread({}, data);
        return this;
      } else {
        throw new Error("data need to be an array.");
      }
    });

    _defineProperty(this, "save", async alias => {
      const result = await Axios({
        url: "".concat(Config.YOUFORM_HOST).concat(Config.YOUFORM_ENDPOINT_SAVE).concat(alias),
        method: 'POST',
        headers: {
          "token": this.token,
          "secret-key": this.secret_key,
          "api-access-token": this.api_access_token
        },
        data: this.newData
      });
      this.clearData();
      return result.data;
    });

    _defineProperty(this, "update", async function (alias) {
      let query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (query != null) {
        const result = await Axios({
          url: "".concat(Config.YOUFORM_HOST).concat(Config.YOUFORM_ENDPOINT_UPDATE).concat(alias),
          method: 'PUT',
          headers: {
            "token": _this.token,
            "secret-key": _this.secret_key,
            "api-access-token": _this.api_access_token
          },
          data: {
            find: query,
            update: _this.newData
          }
        });

        _this.clearData();

        return result.data;
        ù;
      } else {
        throw new Error("query parameter is required.");
      }
    });

    this.token = options.token || null;
    this.secret_key = options.secret_key || null;
    this.api_access_token = options.api_access_token || null;
    this.newData = [];
  }

}

module.exports = YouFormClient;