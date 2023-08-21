import Validate from "../dist/validate.js";

const formInfo = {
  name: "",
  mobile: "1760235881",
  pass: "12345",
  comPass: "123457",
  email: "6@q05.cc",
};

const rules = {
  name: { rule: "required", msg: "请填写真实姓名" },
  mobile: [
    { rule: "required", msg: "手机号码不能为空" },
    { rule: "mobile", msg: "手机号码格式不对" },
  ],
  pass: [
    { rule: "required", msg: "密码不能为空" },
    { rule: "min", value: "6", msg: "密码必须要大于等于6位" },
  ],
  comPass: [
    {
      name: "repeat",
      rule: (value) => value === formInfo.pass,
      msg: "两次密码不一致",
    },
  ],
  email: [
    { rule: "email", msg: "邮箱格式不对" },
    {
      name: "emailRepeat",
      rule: (value) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (value === "6@q05.cc") {
              reject();
            } else {
              resolve();
            }
          }, 1000);
        });
      },
      msg: "邮箱已存在",
    },
  ],
};

const validator = new Validate(rules);

validator
  .validate(formInfo)
  // .then(() => {
  //   console.log("提交成功");
  // })
  // .catch((err) => {
  //   console.log("err", err);
  // });

/* 执行结果
err {
  name: [ { rule: 'required', msg: '请填写真实姓名' } ],
  mobile: [ { rule: 'mobile', msg: '手机号码格式不对' } ],
  pass: [ { rule: 'min', value: '6', msg: '密码必须要大于等于6位' } ],
  comPass: [ { rule: 'repeat', msg: '两次密码不一致' } ],
  email: [ { rule: 'emailRepeat', msg: '邮箱已存在' } ]
}
*/
