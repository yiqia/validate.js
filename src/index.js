import { RULES_LIST } from "./constants";

class Validate {
  data = {}; // 待验证数据
  rules = {}; // 验证规则列表
  error = {}; // 验证错误信息
  constructor(rules) {
    this.rules = rules;
  }

  validate(data) {
    this.data = data;
    this.init();
    // return Promise.allSettled(this.pendingRules);
  }

  init() {
    const fields = Object.keys(this.data);
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const rules = this.rules[field];
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
  validateField(field, value, rule) {
    // if(typeof rule.rule === 'function') {

    // }

    if (RULES_LIST[rule.rule]) {
      return RULES_LIST[rule.rule](value, rule?.value);
    } else {
      throw new Error(`规则${rule.rule}不存在`);
    }
  }
}

export default Validate;
