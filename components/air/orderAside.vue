<template>
  <div class="aside">
    <div class="air-info">
      <el-row type="flex" justify="space-between" class="info-top">
        <div>{{planeData.dep_date}}</div>
        <div>{{planeData.org_city_name}} - {{planeData.dst_city_name}}</div>
      </el-row>
      <el-row type="flex" justify="space-between" align="middle" class="info-step">
        <el-col :span="5" class="flight-airport">
          <strong>{{planeData.dep_time}}</strong>
          <span>{{planeData.org_airport_name}} {{planeData.org_airport_quay}}</span>
        </el-col>
        <el-col :span="14" class="flight-time">
          <span>--- {{gettimer}} ---</span>
          <span>{{planeData.airline_name}} {{planeData.flight_no}}</span>
        </el-col>
        <el-col :span="5" class="flight-airport">
          <strong>{{planeData.arr_time}}</strong>
          <span>{{planeData.dst_airport_name}} {{planeData.dst_airport_quay}}</span>
        </el-col>
      </el-row>
    </div>
    <el-row type="flex" justify="space-between" class="info-bar">
      <span>订单总价</span>
      <span>金额</span>
      <span>数量</span>
    </el-row>
    <el-row type="flex" justify="space-between" class="info-bar">
      <span>成人机票</span>
      <span>￥{{planeData.seat_infos.par_price}}</span>
      <span>x1</span>
    </el-row>
    <el-row type="flex" justify="space-between" class="info-bar">
      <span>机建＋燃油</span>
      <span>¥{{planeData.airport_tax_audlet}}/人/单程</span>
      <span>x1</span>
    </el-row>
    <el-row type="flex" justify="space-between" align="middle" class="info-bar">
      <span>应付总额：</span>
      <span class="price">￥{{allPrice}}</span>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    planeData: {
      type: Object,
      default: { insurances: [], seat_infos: {} }
    },
    allPrice: {
      type: Number,
      dafault: 0
    }
  },
  computed: {
    gettimer() {
      if(!this.planeData.arr_time) return;
      let arrtime = this.planeData.arr_time.split(":"); //到达时间
      let deptime = this.planeData.dep_time.split(":"); //出发时间
      if (arrtime[0] < deptime[0]) {
        arrtime[0] += 24;
      }
      let end = arrtime[0] * 60 + +arrtime[1];
      let start = deptime[0] * 60 + +deptime[1];
      let shicha = end - start;
      let hour = Math.floor(shicha / 60);
      let min = shicha % 60;
      return hour + "小时" + min + "分钟";
    }
  }
};
</script>

<style scoped lang="less">
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}

.air-info {
  padding: 15px;

  .info-top {
    margin-bottom: 10px;
    > div:last-child {
      font-size: 14px;
    }
  }

  .info-step {
    .flight-airport {
      strong {
        display: block;
        font-size: 22px;
        font-weight: normal;
      }

      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      text-align: center;
      font-size: 12px;
      color: #999;
      span {
        display: block;
      }
    }
  }
}

.info-bar {
  border-top: 1px #ddd dashed;
  padding: 10px 15px;
  font-size: 14px;
  color: #666;

  .price {
    font-size: 28px;
    color: orange;
  }
}
</style>

