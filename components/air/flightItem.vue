<template>
  <div class="flight-item">
    <div @click="isshow=!isshow">
      <!-- 显示的机票信息 -->
      <el-row
        style="border:1px solid #ccc;margin-top:5px"
        type="flex"
        align="middle"
        class="flight-info">
        <el-col :span="6">
          <span>{{data.airline_name}} {{data.flight_no}}</span>
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{data.dep_time}}</strong>
              <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{gettimer}}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{data.arr_time}}</strong>
              <span>{{data.dst_airport_name}} {{data.dst_airport_quay}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{data.seat_infos[0].settle_price_child}}</span>起
        </el-col>
      </el-row>
    </div>

    <div class="flight-recommend">
      <!-- 隐藏的座位信息列表 -->
      <el-row type="flex" justify="space-between" align="middle" v-show="isshow">
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row type="flex" 
					justify="space-between" 
					align="middle" 
					class="flight-sell"
					v-for="(item,index) in data.seat_infos" :key="index">
            <el-col :span="16" class="flight-sell-left">
              <span>{{item.group_name}}</span>|{{item.supplierName}}
            </el-col>
            <el-col :span="5" class="price">￥{{item.org_settle_price}}</el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini" @click="airOrder(data.id,item.seat_xid)">选定</el-button>
              <p>剩余：{{item.discount}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
			isshow:false
		};
  },
  // 引入父组件数据
  props: {
    // 数据属性名为data
    data: {
      type: Object,
      default: {}
    }
  },
  //   计算属性
  computed: {
    gettimer() {
      let arrtime = this.data.arr_time.split(":"); //到达时间
      let deptime = this.data.dep_time.split(":"); //出发时间
      if(arrtime[0]<deptime[0]){
        arrtime[0]+=24
      }
      let end = arrtime[0] * 60 + +arrtime[1];
			let start = deptime[0] * 60 + +deptime[1];
			let shicha=end-start
			let hour=Math.floor(shicha/60)
			let min=shicha%60
			return hour+"小时"+min +"分钟"
    }
  },
  methods: {
    airOrder(id,seat_xid){
      this.$router.push({
        path:`/air/order`,
        query:{
          id,
          seat_xid
        }
      })
    }
  },
  mounted() {
	}
};
</script>

<style scoped lang="less">
.flight-item {
  margin-bottom: 10px;
  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>