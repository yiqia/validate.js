```js
import Validate from "../dist/validate.js";

const formInfo = {
  name: "John",
  mobile: "17602358181",
  pass: "123456",
  email: '6@q05.cc',
};

// bad example
if (!formInfo.name) {
    console.log('请填写真实姓名')
  } else if (!formInfo.mobile) {
    console.log('请填写手机号码')
  }else if (!PHONE_REGEXP.test(formInfo.mobile)) {
    console.log('手机号格式不正确')
  }else if(!formInfo.pass){
    console.log('密码不能为空')
  }else if(pass.lenght < 6){
    console.log('密码必须要大于6位')
  }else if (!EMAIL_REGEXP.test(formInfo.email)) {
    console.log('邮箱格式不正确')
  }
```
