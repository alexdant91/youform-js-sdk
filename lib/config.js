"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Config {}

_defineProperty(Config, "YOUFORM_HOST", "http://localhost");

_defineProperty(Config, "YOUFORM_ENDPOINT_LOGIN", "/api/login");

_defineProperty(Config, "YOUFORM_ENDPOINT_FIND", "/api/datalab/find/");

_defineProperty(Config, "YOUFORM_ENDPOINT_FIND_ONE", "/api/datalab/findOne/");

_defineProperty(Config, "YOUFORM_ENDPOINT_PAGINATE", "/api/datalab/paginate/");

_defineProperty(Config, "YOUFORM_ENDPOINT_SAVE", "/api/datalab/save/");

_defineProperty(Config, "YOUFORM_ENDPOINT_UPDATE", "/api/datalab/update/");

module.exports = Config;