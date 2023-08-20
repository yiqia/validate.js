import { RULES_LIST } from "./constants";

function Validate(target, rules) {
  this.target = target;
  this.rules = rules;
  this.pending = [];
  this.error = {};
  this.init();
  return new Promise((resolve, reject) => {
    Promise.allSettled(this.pending).then(() => {
      if (Object.keys(this.error).length > 0) {
        reject(this.error);
        return;
      }
      resolve();
    });
  });
}

// 初始化验证器
Validate.prototype.init = function () {
  const fields = Object.keys(this.target);
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const rules = this.rules[field];
    if (rules && rules.length > 0) {
      for (let j = 0; j < rules.length; j++) {
        const rule = rules[j];
        this.pending.push(this.check(field, this.target[field], rule));
      }
    }
  }
};

// 验证
Validate.prototype.check = function (field, value, rule) {
  return new Promise((resolve, reject) => {
    if (typeof rule.rule === "function") {
      rule.rule(
        value,
        () => {
          resolve();
        },
        (error) => {
          this.insertError(field, error);
          reject();
        }
      );
    } else {
      const res = RULES_LIST[rule.rule](value, rule.value || undefined);
      if (res) {
        resolve();
      } else {
        this.insertError(field, rule);
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

export default Validate;
