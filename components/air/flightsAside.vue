<template>
  <div class="aside">
    <div class="top">
      <el-row type="flex" class="topEl-row">
        <el-col :span="8">
          <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>
          <span>航协认证</span>
        </el-col>
        <el-col :span="8">
          <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>
          <span>出行保证</span>
        </el-col>
        <el-col :span="8">
          <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>
          <span>7x24</span>
        </el-col>
      </el-row>
      <p class="tel">免费客服电话：4006345678转2</p>
    </div>
    <div class="hist">
      <h5>历史查询</h5>
      <nuxt-link :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`" class="link" v-for="(item,index) in $store.state.air.history" :key="index">
        <el-row type="flex" justify="space-between" class="his-row" align="middle">
          <div class="left">
            <p>{{item.departCity}} - {{item.destCity}}</p>
            <span>{{item.departDate}}</span>
          </div>
          <el-button type="warning" class="btn">选择</el-button>
        </el-row>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  // watch:{
  //   $route(){
  //     // this.$router.push({
  //     //   path:"/air/flights",
  //     //   query:this.$store.state.air.history
  //     // })

  //   }
  // },
  methods: {
  },
  mounted () {
  }
};
</script>
<style lang="less" scoped>
.top {
  border: 1px solid #ddd;
}
.topEl-row {
  padding: 10px 0;
  text-align: center;
  i {
    display: block;
    font-size: 40px;
  }
  span {
    font-size: 12px;
  }
}
.tel {
  font-size: 14px;
  background-color: #f6f6f6;
  padding: 5px 10px;
}
.hist {
  border: 1px solid #ddd;
  margin-top: 5px;
  padding: 5px 5px;
  h5 {
    font-size: 16px;
    font-weight: normal;
    border-bottom: 1px solid #eee;
    height: 30px;
  }
  .link{
    padding: 5px;
    .his-row{
      p{
        font-size: 14px;
      }
      span{
        color:#666;
        font-size: 12px;
      }
      .btn{
        font-size: 12px;
        width: 50px;
        height: 20px;
        padding: 4px 12px;
        text-align: center;
      }
    }
  }
}
</style>
