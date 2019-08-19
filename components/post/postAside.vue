<template>
  <div class="aside">
    <div class="top" @mouseleave="leaveactive">
        <el-row
          :class="{active:count === index}"
          type="flex"
          justify="space-between"
          v-for="(item,index) in data"
          :key="index"
          @mouseover.native="getactive(item.children,index)"
        >
          <span>{{item.type}}</span>
          <i class="el-icon-arrow-right"></i>
        </el-row>
      

      <div class="item-list" v-if="isshow" @mouseover="delay" @mouseleave="removedelay">
        <el-row
          type="flex"
          justify="space-around"
          v-for="(item,index) in item"
          :key="index"
          class="row"
        >
          <el-col class="colorindex" :span="2">{{index+1}}</el-col>
          <el-col class="colortext" :span="4">
            <span @click="listcity(item.city)">{{item.city}}</span>
          </el-col>
          <el-col class="text" :span="18">
            <span @click="listcity(item.city)">{{item.desc}}</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="bottom">
      <h4>推荐城市</h4>
      <div class="tuijian" @click="recommendasidecity">
        <nuxt-link to="#">
          <img src="@/assets/images/pic_sea.jpeg" alt />
        </nuxt-link>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 5,
      data: [],
      row: 0,
      isshow: false,
      item: [],
      timer: null,
      bl: false
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
        // console.log(res)
      this.data = res.data.data;
    });
  },
  methods: {
    getactive(item, index) {
      this.isshow = true;
      this.item = item;
      this.count = index
    },

    leaveactive() {
      this.timer = null;
      this.timer = setInterval(() => {
        if (this.bl) {
          clearInterval(this.timer);
        } else {
          this.isshow = false;
          this.count = 5
          clearInterval(this.timer);
        }
      }, 100);
    },

    delay() {
      this.bl = true;
      // console.log(this.bl)
      clearInterval(this.timer);
    },

    removedelay() {
      this.bl = false;
      this.isshow = false;
      this.count = 5
      clearInterval(this.timer);
    },
    recommendasidecity(){
      this.$emit('tuijiancity')
    },
    listcity(city){
      this.$emit('tuijiancity',city)
    }
  }
};
</script>

<style scoped lang='less'>
.aside {
  .top {
    position: relative;
    margin: 30px 0 10px;
    margin-right: 1px;
    z-index: 2;

    >.el-row {
      border: 1px solid #ddd;
      padding: 10px;
      font-size: 14px;
      margin-top: -1px;

      &.active {
        color: #ffa500;
        border-right: 1px solid #fff;
      }

      i {
        margin-top: 3px;
      }
    }

    .item-list {
      position: absolute;
      top: 0px;
      right: -351px;
      width: 320px;
      // height: 160px;
      background-color: #ffffff;
      border: 1px solid #ddd;
      z-index: -1;
      padding: 15px;
      line-height: 30px;
      // display: none;

      .row {
        margin: 5px 0;
      }

      .colortext {
        color: #ffa500;
        font-size: 15px;
        cursor: pointer;
      }

      .colorindex {
        color: #ffa500;
        font-size: 22px;
        font-style: italic;
      }

      .text {
        color: #999999;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }

  .bottom {
    h4 {
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
      font-weight: 500;
    }

    .tuijian {
      width: 250px;

      img {
        width: 100%;
      }
    }
  }
}
</style>
