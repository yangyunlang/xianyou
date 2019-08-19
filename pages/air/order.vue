<template>
  <div class="order">
    <el-row type="flex" justify="space-between">
      <!--  左侧表单 -->
      <OrderForm :data="planeData" @setAllprice="setAllprice"/>

      <!-- 右侧数据 -->
      <OrderAside :planeData="planeData" :allPrice="allPrice"/>
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm"
import OrderAside from "@/components/air/orderAside"
export default {
  components: {
    OrderForm,
    OrderAside
  },
  data () {
    return {
      // 航班数据(传给子组件)
      planeData:{
        insurances:[],
        seat_infos:{}
      },
      allPrice:0
    }
  },
  methods: {
    setAllprice(allPrice){
      this.allPrice=allPrice
    }
  },
  mounted () {
    let {id,seat_xid} =this.$route.query
    this.$axios({
      url:`/airs/${id}`,
      params:{
        seat_xid
      }
    }).then(res=>{
      this.planeData=res.data;
    })
  }
};
</script>

<style lang="less" scoped>
.order {
  width: 1000px;
  margin: 0 auto;
}
</style>

