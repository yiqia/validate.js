import Validate from "../dist/validate.js";

const obj = {
  name: "John",
  mobile: "17602358181",
  pass: "123456",
  father: {
    name: "John father",
  },
  diy: "diy",
};

const rules = {
  name: [{ rule: "required", msg: "名称不能为空" }],
  mobile: [
    { rule: "required", msg: "手机号码不能为空" },
    { rule: "mobile", msg: "手机号码格式不对" },
  ],
  pass: [{ rule: "required", msg: "密码不能为空" }],
  father: {
    name: [{ rule: "required", msg: "名称不能为空" }],
  },
  diy: [
    {
      rule: (value, resolve, reject) => {
        setTimeout(() => {
          if (value === "diy") {
            console.log("diy");
            resolve();
          } else {
            reject({
              rule: "check",
              msg: "diy错误",
            });
          }
        }, 1000);
      },
      msg: "diy",
    },
  ],
};

new Validate(obj, rules)
  .then(() => {
    console.log("success");
  })
  .catch((err) => {
    console.log("err", JSON.stringify(err));
  });
