const Validate = require("../dist/validate.cjs");

const obj = {
  name: "John",
  phone: "1234567890",
  pass: "123456",
  confirm_pass: "123456",
};

const rules = {
  name: [{ rule: "required", msg: "名称不能为空" }],
  phone: [
    { rule: "required", msg: "手机号码不能为空" },
    { rule: "phone", msg: "手机号码格式不对" },
  ],
  pass: [{ rule: "required", msg: "密码不能为空" }],
  confirm_pass: [{ rule: "same:pass", msg: "两次密码不一致" }],
};

new Validate(obj, rules);
