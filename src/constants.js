export const RULES_REGEX = {
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
  english: /^[A-Za-z]+$/,
};

// 规则消息
export const RULES_MESSAGE = {
  required: "The %s field is required.",
  number: "The %s field must be number.",
  email: "The %s field must be email.",
  mobile: "The %s field must be mobile.",
  idCard: "The %s field must be idCard.",
  money: "The %s field must be money.",
  date: "The %s field must be date.",
  time: "The %s field must be time.",
  dateTime: "The %s field must be dateTime.",
  zipCode: "The %s field must be zipCode.",
  ip: "The %s field must be ip.",
  ipv6: "The %s field must be ipv6.",
  url: "The %s field must be url.",
  chinese: "The %s field must be chinese.",
  english: "The %s field must be english.",
};

// 规则列表
export const RULES_LIST = {
  required(val) {
    return val !== null && val !== undefined && val !== "";
  },
  max(fieldValue, ruleValue) {
    return fieldValue.length <= Number(ruleValue);
  },
  min(fieldValue, ruleValue) {
    return fieldValue.length >= Number(ruleValue);
  },
  mobile(fieldValue) {
    return RULES_REGEX.mobile.test(fieldValue);
  },
  idCard(fieldValue) {
    return RULES_REGEX.idCard.test(fieldValue);
  },
};
