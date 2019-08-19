export const state=()=>{
  return {
    // 历史查询记录
    history:[]
  }
}
// 设置本地数据
export const mutations={
  setHistory(state,arr){
    state.history=arr
  }
}