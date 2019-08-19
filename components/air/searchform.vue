<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span :class="{active:curr==index}" v-for="(item,index) in tab" :key="index" @click="tabClick(index)">
        <i :class="item.icon">{{item.name}}</i>
      </span>
    </el-row>
    <el-form class="search-form-content" label-width="80px" ref="form" :model="form">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions: 当每次在输入框中输入文字时候会触发该事件 -->
        <!-- select：选中下拉列表的选项时候触发的事件 -->
        <el-autocomplete
          :fetch-suggestions="departSearch"
          placeholder="请搜索出发城市"
          class="el-autocomplete"
          @select="seleDepart"
          v-model="form.departCity"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="destSearch"
          placeholder="请搜索到达城市"
          class="el-autocomplete"
          @select="seleDest"
          v-model="form.destCity"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          v-model="form.departDate"
          @change="getDate"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label>
        <el-button style="width:100%;" 
        type="primary" 
        icon="el-icon-search"
        @click="submitSearch">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span>换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      // tab
      tab: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      // tab栏切换
      curr: 0,
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      }
    };
  },
  methods: {
    // 点击往返时提示用户不可用
    tabClick(index){
      if(index==1){
        this.$message.warning("暂不支持往返")
      }
    },
    // 出发城市输入时触发
    departSearch(value, cb) {
      if (!value) {
        cb([]);
        return;
      }
      this.$axios({
        //   http://157.122.54.189:9095/
        url: "http://157.122.54.189:9095/airs/city",
        params: { name: value }
      }).then(res => {
        // console.log(res);
        // 遍历数组
        let data = res.data.data.map(item => {
          item.value = item.name.replace("市", "");
          // 使用map方法可以将每次return 的数据 存在一个数组里
          // 此时data是一个数组[]
          return item;
        });
        // console.log(data);
        // 默认获取提示城市的第一项
        this.form.departCity = data[0].value;
        this.form.departCode = data[0].sort;
        cb(data);
      });
    },
    // 到达城市输入时触发
    destSearch(value, cb) {
      if (!value) {
        cb([]);
        return;
      }
      this.$axios({
        //   http://157.122.54.189:9095/
        url: "http://157.122.54.189:9095/airs/city",
        params: { name: value }
      }).then(res => {
        // console.log(res);
        // 遍历数组
        let data = res.data.data.map(item => {
          item.value = item.name.replace("市", "");
          // 使用map方法可以将每次return 的数据 存在一个数组里
          // 此时data是一个数组[]
          return item;
        });
        // 默认获取提示城市的第一项
        this.form.destCity = data[0].value;
        this.form.destCode = data[0].sort;
        cb(data);
      });
    },
    // 点击选择出发城市时触发
    seleDepart(val) {
      // console.log(val);
      this.form.departCity = val.value;
      this.form.departCode = val.sort;
    },
    // 点击选择到达城市时触发
    seleDest(val) {
      this.form.destCity = val.value;
      this.form.destCode = val.sort;
    },
    // 点击获取出发日期时触发
    getDate(val) {
      // console.log(val);
      // console.log(moment(val).format("YYYY-MM-DD"));
      this.form.departDate = moment(val).format("YYYY-MM-DD");
      // console.log(this.form);
    },
    submitSearch(){
      if(!this.form.departCode){
        this.$message.warning("出发城市不能为空")
        return
      }else if(!this.form.destCode){
        this.$message.warning("到达城市不能为空")
        return
      }else if(!this.form.departDate){
        this.$message.warning("出发日期不能为空")
        return
      }
      // 跳转到对应机票页面
      this.$router.push({
        path:'/air/flights',
        query:this.form
      })
      // 因为本地存储的获取数据不可以用state修改，只能获取，需要深拷贝
     let arr= [...this.$store.state.air.history]
    //  将每次请求的参数存储到本地
     arr.push(this.form)
    //  保持历史记录为5条
     arr.length>5?arr.length=5:'';
    //  调用设置历史记录的方法，将历史记录覆盖原来的历史记录
     this.$store.commit("air/setHistory",arr)
    }
  }
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>