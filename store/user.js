// 用户模块store数据管理文件
// 保存用户数据属性 state
export const state=()=>{
  return{
    userInfo:{
      token:'',
      user:{
        nickname:'',
        defaultAvatar:''
      }
    }
  }
}
// 设置用户数据
export const mutations= {
  // 定义方法
  // 保存登录数据
  setUserInfo(state,data){
    state.userInfo=data
  },
  // 清除登录数据
  delUserInfo(state){
    state.userInfo={}
  }
}