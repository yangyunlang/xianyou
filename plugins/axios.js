import {Message} from "element-ui";

// axios拦截插件，处理错误返回
// 每一个nuxt的插件都会暴露一个函数
// 插件的的一个参数是默认的nuxt对象
export default ({$axios,redirect}) =>{
  $axios.onError(res=>{
    // console.log(res);
    const {statusCode,message}=res.response.data;
    if(statusCode==401||statusCode==403){
      redirect("/user/login")
    }
    // 判断错误信息，提示返回的错误信息
    if(statusCode==400){
      Message.warning(message)
    }
  })
  
}