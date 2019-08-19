<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :flightall="airData" @getDataList="getDataList" />

        <!-- 航班头部布局 -->
        <FlightHeader />

        <!-- 航班信息 -->
        <div>
          <FlightItem v-for="(item,index) in currList" :key="index" :data="item" />

          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightHeader from "@/components/air/flightHeader";
import FlightItem from "@/components/air/flightItem";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/flightsAside";

export default {
  components: {
    FlightHeader,
    FlightItem,
    FlightsFilters,
    FlightsAside
  },
  data() {
    return {
      // 所有航班信息(变化)
      flightAll: {
        flights: [],
        info: {},
        options: {}
      },
      // 所有航班信息(不变)
      airData: {
        flights: [],
        info: {},
        options: {}
      },
      currList: [], //当前页面显示的航班信息
      total: 0, //总条数
      pagesize: 2, //每页显示条数
      pagenum: 1 //当前页码
    };
  },
  methods: {
    // 改变每页显示条数时触发
    handleSizeChange(size) {
      this.pagesize = size;
      this.getDataList();
    },
    // 改变当前页码时触发
    handleCurrentChange(num) {
      this.pagenum = num;
      this.getDataList();
    },
    // 请求列表航班数据
    getAirList() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        this.flightAll = res.data;
        this.airData = { ...res.data };
        // console.log(this.flightAll);
        this.currList = this.flightAll.flights.slice(0, 2);
        this.total = this.flightAll.flights.length;
      });
    },
    //获取页面航班列表
    getDataList(arr) {
      // 如果arr有数据说明有筛选，重新赋值列表数据
      arr?this.flightAll.flights=arr:''
      this.currList = this.flightAll.flights.slice(
        (this.pagenum - 1) * this.pagesize,
        this.pagenum * this.pagesize
      )
        this.total = this.flightAll.flights.length;
    }
  },
  mounted() {
    this.getAirList();
  },
  watch:{
    $route(){
     this.getAirList()
     this.pagenum=1
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
.clearSearch {
  margin-bottom: 10px;
}
</style>