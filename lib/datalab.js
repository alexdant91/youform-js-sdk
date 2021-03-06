"use strict";

require("core-js/modules/es.promise");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Axios = require('axios');

const Config = require('./config');

const YouFormClient = require('./client');

class DataLab extends YouFormClient {
  constructor() {
    var _this;

    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      token: null,
      secret_key: null,
      api_access_token: null
    };
    super({
      token: options.token,
      secret_key: options.secret_key,
      api_access_token: options.api_access_token
    });
    _this = this;

    _defineProperty(this, "clearData", () => {
      this.newData = [];
      return this;
    });

    _defineProperty(this, "find", async function (alias) {
      let query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      try {
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
      } catch (err) {
        console.log(err);
        throw new Error("Server not responding, probably temporary offline.");
      }
    });

    _defineProperty(this, "paginate", async function (alias) {
      let query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      try {
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
      } catch (err) {
        console.log(err);
        throw new Error("Server not responding, probably temporary offline.");
      }
    });

    _defineProperty(this, "findOne", async (alias, query) => {
      try {
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
      } catch (err) {
        console.log(err);
        throw new Error("Server not responding, probably temporary offline.");
      }
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
      try {
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
      } catch (err) {
        console.log(err);
        throw new Error("Server not responding, probably temporary offline.");
      }
    });

    _defineProperty(this, "update", async function () {
      let alias = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      let query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (alias != null && query != null) {
        try {
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
        } catch (err) {
          console.log(err);
          throw new Error("Server not responding, probably temporary offline.");
        }
      } else {
        throw new Error("alias and query parameters are required.");
      }
    });

    _defineProperty(this, "deleteOne", async function () {
      let alias = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      let query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (alias != null && query != null) {
        const find = typeof query === "object" ? query : false;

        if (find) {
          try {
            const result = await Axios({
              url: "".concat(Config.YOUFORM_HOST).concat(Config.YOUFORM_ENDPOINT_DELETE_ONE).concat(alias),
              method: 'DELETE',
              headers: {
                "token": _this.token,
                "secret-key": _this.secret_key,
                "api-access-token": _this.api_access_token
              },
              data: find
            });

            _this.clearData();

            return result.data;
          } catch (err) {
            console.log(err);
            throw new Error("Server not responding, probably temporary offline.");
          }
        } else {
          throw new Error("query parameter must be an object.");
        }
      } else {
        throw new Error("alias and query parameters are required.");
      }
    });

    _defineProperty(this, "deleteMany", async function () {
      let alias = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      let query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (alias != null && query != null) {
        const find = Array.isArray(query) ? query : false;

        if (find) {
          try {
            const result = await Axios({
              url: "".concat(Config.YOUFORM_HOST).concat(Config.YOUFORM_ENDPOINT_DELETE_MANY).concat(alias),
              method: 'DELETE',
              headers: {
                "token": _this.token,
                "secret-key": _this.secret_key,
                "api-access-token": _this.api_access_token
              },
              data: {
                many: find
              }
            });
          } catch (err) {
            console.log(err);
            throw new Error("Server not responding, probably temporary offline.");
          }

          _this.clearData();

          return result.data;
        } else {
          throw new Error("query parameter must be an array of objects.");
        }
      } else {
        throw new Error("alias and query parameters are required.");
      }
    });

    this.newData = [];
  }

}

module.exports = DataLab;