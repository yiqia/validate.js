'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var RULES_REGEX = {
  // 必填
  required: /\S+/,
  // 数字
  number: /^\d+$/,
  // 邮箱
  email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
  // 手机号码
  mobile: /^1[3456789]\d{9}$/,
  // 身份证号码
  idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  // 金额
  money: /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,
  // 日期
  date: /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/,
  // 时间
  time: /^([0-1]\d|2[0-3])(:[0-5]\d){1,2}$/,
  // 日期时间
  dateTime: /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2} ([0-1]\d|2[0-3])(:[0-5]\d){1,2}$/,
  // 邮政编码
  zipCode: /^[1-9][0-9]{5}$/,
  // IP地址
  ip: /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/,
  // IPv6地址
  ipv6: /^([\\da-fA-F]{1,4}:){7}[\\da-fA-F]{1,4}$/,
  // 网址
  url: /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/,
  // 中文
  chinese: /^[\u4e00-\u9fa5]{0,}$/,
  // 英文
  english: /^[A-Za-z]+$/
};

// 规则列表
var RULES_LIST = {
  required: function required(val) {
    return val !== null && val !== undefined && val !== "";
  },
  max: function max(fieldValue, ruleValue) {
    return fieldValue.length <= Number(ruleValue);
  },
  min: function min(fieldValue, ruleValue) {
    return fieldValue.length >= Number(ruleValue);
  },
  mobile: function mobile(fieldValue) {
    return RULES_REGEX.mobile.test(fieldValue);
  },
  idCard: function idCard(fieldValue) {
    return RULES_REGEX.idCard.test(fieldValue);
  },
  email: function email(fieldValue) {
    return RULES_REGEX.email.test(fieldValue);
  }
};

var Validate = /*#__PURE__*/function () {
  // 验证错误信息
  function Validate(rules) {
    _classCallCheck(this, Validate);
    _defineProperty(this, "data", {});
    // 待验证数据
    _defineProperty(this, "rules", {});
    // 验证规则列表
    _defineProperty(this, "error", {});
    this.rules = rules;
  }
  _createClass(Validate, [{
    key: "validate",
    value: function validate(data) {
      this.data = data;
      this.init();
      // return Promise.allSettled(this.pendingRules);
    }
  }, {
    key: "init",
    value: function init() {
      var fields = Object.keys(this.data);
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var rules = this.rules[field];
        // 规则列表是单个对象而不是数组
        if (isObjectNotArray(rules)) {
          this.validateField(field, this.data[field], rules);
        }
        console.log(rules);
      }
    }
    /**
     *
     * @param {string} field
     * @param {*} value
     * @param {*} rule
     */
  }, {
    key: "validateField",
    value: function validateField(field, value, rule) {
      // if(typeof rule.rule === 'function') {

      // }

      if (RULES_LIST[rule.rule]) {
        return RULES_LIST[rule.rule](value, rule === null || rule === void 0 ? void 0 : rule.value);
      } else {
        throw new Error("\u89C4\u5219".concat(rule.rule, "\u4E0D\u5B58\u5728"));
      }
    }
  }]);
  return Validate;
}();

module.exports = Validate;
