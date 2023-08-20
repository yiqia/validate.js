'use strict';

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
  }
};

function Validate(target, rules) {
  var _this = this;
  this.target = target;
  this.rules = rules;
  this.pending = [];
  this.error = {};
  this.init();
  return new Promise(function (resolve, reject) {
    Promise.allSettled(_this.pending).then(function () {
      if (Object.keys(_this.error).length > 0) {
        reject(_this.error);
        return;
      }
      resolve();
    });
  });
}

// 初始化验证器
Validate.prototype.init = function () {
  var fields = Object.keys(this.target);
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    var rules = this.rules[field];
    if (rules && rules.length > 0) {
      for (var j = 0; j < rules.length; j++) {
        var rule = rules[j];
        this.pending.push(this.check(field, this.target[field], rule));
      }
    }
  }
};

// 验证
Validate.prototype.check = function (field, value, rule) {
  var _this2 = this;
  return new Promise(function (resolve, reject) {
    if (typeof rule.rule === "function") {
      rule.rule(value, function () {
        resolve();
      }, function (error) {
        _this2.insertError(field, error);
        reject();
      });
    } else {
      var res = RULES_LIST[rule.rule](value, rule.value || undefined);
      if (res) {
        resolve();
      } else {
        _this2.insertError(field, rule);
        reject();
      }
    }
  });
};

// 插入错误
Validate.prototype.insertError = function (field, rule) {
  if (!this.error[field]) {
    this.error[field] = [rule];
  } else {
    this.error[field].push(rule);
  }
};

module.exports = Validate;
