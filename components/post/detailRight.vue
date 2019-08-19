<template>
  <div class="detailRight">
    <h3>相关攻略</h3>
    <div class="content">
      <!-- 相关文章列表 -->
      <nuxt-link
        class="list"
        @click="toDetailByid(item.id)"
        :to="`/post/detail?id=${item.id}`"
        v-for="(item,index) in data"
        :key="index"
      >
        <el-row type="flex" class="el-row">
          <img :src="item.images[0]" />
          <div class="text">
            <p>{{item.title}}</p>
            <span>{{item.updated_at|gettimer}} 阅读{{item.watch?item.watch:''}}</span>
          </div>
        </el-row>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      //推荐文章数据
      data: []
    };
  },
  methods: {
    // 获取推荐文章
    getRecommend() {
      this.$axios({
        url: "/posts/recommend",
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        // console.log(res, 333333333333);
        this.data = res.data.data;
        if (this.data.length > 5) {
          this.data.length = 5;
        }
      });
    },
  },
  mounted() {
    this.getRecommend();
  },
  filters: {
    gettimer: timer => {
      let newdate = moment(timer).format("YYYY-MM-DD HH:mm");
      return newdate;
    }
  },
  // 侦听器
  watch: {
    $route(to, from) {
      this.getRecommend();
    }
  }
};
</script>

<style lang="less" scoped>
.detailRight {
  width: 280px;
  margin: 10px 0;
  h3 {
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    font-size: 18px;
    font-weight: normal;
  }
  .el-row {
    padding: 10px;
    height: 120px;
    border-bottom: 1px solid #ccc;
    img {
      height: 80px;
      width: 100px;
      display: block;
    }
    .text {
      padding: 8px 0 10px 8px;
      p {
        overflow: hidden;
        font-size: 14px;
        height: 45px;
        line-height: 22px;
      }
      span {
        display: block;
        margin-top: 30px;
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>