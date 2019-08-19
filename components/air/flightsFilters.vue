<template>
  <div>
    <!-- 筛选 -->
    <el-row type="flex" justify="space-between">
      <el-col :span="10">单程: {{airDate.departCity}}-{{airDate.destCity}}/{{airDate.departDate}}</el-col>
      <el-col>
        <el-row type="flex" justify="center" :gutter="10">
          <el-col :span="6">
            <el-select size="small" v-model="airport" placeholder="起飞机场" @change="handleAirport">
              <el-option
                v-for="(item,index) in flightall.options.airport"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>

          <el-col :span="6">
            <el-select
              size="small"
              v-model="flightTimes"
              placeholder="起飞时间"
              @change="handleFlightTimes"
            >
              <el-option
                v-for="(item,index) in flightall.options.flightTimes"
                :key="index"
                :label="`${item.from}:00-${item.to}:00`"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>

          <el-col :span="6">
            <el-select size="small" v-model="company" placeholder="航空公司" @change="handleCompany">
              <el-option
                v-for="(item,index) in flightall.options.company"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select size="small" v-model="airSize" placeholder="机型" @change="handleAirSize">
              <el-option
                v-for="(item,index) in planeSize"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 撤销筛选 -->
    <div class="clearSearch">
      筛选:
      <el-button type="primary" round plain size="small" @click="clear">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    flightall: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      airDate: this.$route.query,
      airport: "", //起飞机场
      flightTimes: "", //起飞时间
      company: "", //航空公司
      airSize: "", //机型
      planeSize: [
        { value: "L", label: "大" },
        { value: "M", label: "中" },
        { value: "X", label: "小" }
      ]
    };
  },
  methods: {
    // 撤销筛选时触发
    clear(){
      this.airport= "", //起飞机场
      this.flightTimes= "", //起飞时间
      this.company= "", //航空公司
      this.airSize= "" //机型
    },
    // 选择起飞机场时触发筛选
    handleAirport(val) {
      let arr = this.flightall.flights.filter(v => {
        return v.org_airport_name == val;
      });
      this.$emit("getDataList", arr);
    },
    // 选择起飞时间时触发筛选
    handleFlightTimes(val) {
      // console.log(val);//{from:0,to:6}
      let arr = this.flightall.flights.filter(v => {
        // 航班起飞小时数
        let start = v.dep_time.splice(":")[0];
        return +start >= +val.from && +start < +val.to;
      });
      this.$emit("getDataList", arr);
    },
    // 选择航空公司时触发筛选
    handleCompany(val) {
      let arr = this.flightall.flights.filter(v => {
        return v.airline_name == val;
      });
      this.$emit("getDataList", arr);
    },
    // 选择机型大小时触发筛选
    handleAirSize(val) {
      let arr = this.flightall.flights.filter(v => {
        return v.plane_size == val;
      });
      this.$emit("getDataList", arr);
    }
  },
};
</script>
<style lang="less" scoped>
.clearSearch {
  margin-bottom: 10px;
}
</style>

