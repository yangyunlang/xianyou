<template>
  <div class="scenicInfo">
    <el-row type="flex" justify="space-between">
      <!--  景点信息部分 -->
      <el-col :span="14" class="content">
        <el-row type="flex" class="content-1">
          <el-col :span="3" style="margin-right:20px">区域:</el-col>
          <el-col>
            <div :class="{scenicPoint:isHidden}">
              <nuxt-link to="#">
                <span style="margin-right:20px">全部</span>
              </nuxt-link>
              <nuxt-link to="#" style="margin-right:10px" v-for="(item,index) in info" :key="index">
                <span>{{item.area}}</span>
              </nuxt-link>
            </div>
            <div @click="handleHidden" class="isShowArea">
              <i class="el-icon-arrow-down" v-if="isArrow"></i>
              <i class="el-icon-arrow-up" v-if="!isArrow"></i>
              <span>等43个区域</span>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" class="content-2">
          <el-col :span="4">
            <span style="margin-right:20px">攻略:</span>
          </el-col>
          <el-col>
            <span>北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="content-3">
          <el-col :span="3" style="margin-right:20px">均价:</el-col>
          <el-col :span="7">
            <i class="el-icon-trophy"></i>
            <i class="el-icon-trophy"></i>
            <i class="el-icon-trophy"></i>
            <span>￥332</span>
          </el-col>
          <el-col :span="7">
            <i class="el-icon-trophy"></i>
            <i class="el-icon-trophy"></i>
            <i class="el-icon-trophy"></i>
            <span>￥521</span>
          </el-col>
          <el-col :span="7">
            <i class="el-icon-trophy"></i>
            <i class="el-icon-trophy"></i>
            <i class="el-icon-trophy"></i>
            <span>￥768</span>
          </el-col>
        </el-row>
      </el-col>
      <!-- 右侧地图 -->
      <el-col :span="10" class="map">
        <div id="container"></div>
      </el-col>
    </el-row>
    <!-- 引入高德地图 -->
    <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=9eebad405bae2e04611316432b05d1c4"
    ></script>
  </div>
</template>
<script>
import "element-ui/lib/theme-chalk/display.css";
export default {
  data() {
    return {
      info: [],
	  isArrow: true,
	  isHidden:true
    };
  },
  methods: {
    // 地图显示 显示多个定位标点
    map() {
      let map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [118.8718107, 31.32846821], //中心点坐标
        viewMode: "3D" //使用3D视图
      });

      let markerList = [];
      this.info.forEach(item => {
        // 创建一个 Marker 实例：
        let marker = new AMap.Marker({
          position: new AMap.LngLat(
            item.location.longitude,
            item.location.latitude
          ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          offset: new AMap.Pixel(-10, -10),
          title: "北京"
        });
        markerList.push(marker);
      });

      // 将创建的点标记添加到已有的地图实例：
      map.add(markerList);
	},
	handleHidden(){
		this.isArrow = !this.isArrow
		this.isHidden = !this.isHidden
	}
  },
  mounted() {
    this.$axios({
      url: "/hotels"
    }).then(res => {
      this.info = res.data.data;
      this.map();
    });
  }
};
</script>
<style lang="less" scoped>
.scenicInfo {
  .content {
    padding: 5px;
    font-size: 14px;
    .content-1 {
      height: 50px;
      margin-bottom: 20px;
      .isShowArea {
        i {
          width: 16px;
          line-height: 14px;
          text-align: center;
          margin-right: 5px;
          color: #ff9900;
        }
      }
      /deep/.scenicPoint {
        height: 20px;
        overflow: hidden;
      }
    }
    .content-2 {
      margin-bottom: 20px;
    }
    .content-3 {
      i {
        color: #ff9900;
      }
    }
  }
  .map {
    width: 420px;
    #container {
      height: 260px;
    }
  }
}
</style>
