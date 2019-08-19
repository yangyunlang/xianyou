<template>
  <!-- <p>文章内容</p> -->
  
  <div class="postmain">
    <div class="search">
      <el-input
        v-model="search_input"
        placeholder="请输入想去的地方，比如：'广州'"
        class="input"
        suffix-icon="el-icon-search"
        @keyup.13.native="searchcity"
      ></el-input>
      <el-row class="row">
        <span>推荐：</span>
          <span v-for="(item,index) in ['广州','上海','北京']" :key="index" @click="recommendcity(item)" class="tuijiancity">{{item}}</span>
      </el-row>
    </div>

    <!-- 文章头部 -->
    <el-row type="flex" justify="space-between" class="row2">
      <span class="text">推荐攻略</span>
      <span style="margin-bottom:10px">
        <el-button type="primary" class="el-icon-edit" @click="jumpppage">写游记</el-button>
      </span>
    </el-row>

    <!-- 所有文章类型 -->
    <div class="allpost" v-for="(item,index) in data.data" :key="index" >

      <!-- 第一个文章类型 图片等于3张的时候显示-->
      <div class="post" v-if="item.images.length === 3">
        <nuxt-link :to="`/post/detail?id=${item.id}`">
          <h3>{{item.title}}</h3>
        </nuxt-link>
        <!-- 文章 -->
        <nuxt-link :to="`/post/detail?id=${item.id}`">
          <div class="posttext" v-html="item.summary"></div>
        </nuxt-link>

        <!-- 图片 -->
        <nuxt-link :to="`/post/detail?id=${item.id}`">
          <el-row type="flex" justify="space-between" class="row3">
              <div v-for="(item1,index1) in item.images" :key="index1" 
              :style="`background:url('${item1}') no-repeat center;background-size: cover;`"></div>
          </el-row>
        </nuxt-link>

        <el-row class="row4" type="flex" justify="space-between">
          <el-col class="row4-left" :span="8">
            <el-row type="flex" justify="space-between">
              <span>
                <i class="el-icon-location-outline"></i>
              </span>
              <nuxt-link to="#">
                  <span>{{item.cityName}}</span>
              </nuxt-link>
              
              <span>by</span>
              <nuxt-link to="#">
                <span
                  :style="`background:url('http://157.122.54.189:9095${item.account.defaultAvatar}') no-repeat center;background-size: 16px 16px;`"
                  class="avatar"
                ></span>
              </nuxt-link>
              <nuxt-link to="#">
                <span style="color:#ffa500">{{item.account.nickname}}</span>
              </nuxt-link>

              <span>
                <i class="el-icon-view"></i>
                {{item.watch}}
              </span>
            </el-row>
          </el-col>
          <div class="row4-right">
            <span>{{item.like|likecount}}</span>
            <span>赞</span>
          </div>
        </el-row>
      </div>

      <!-- 第二个文章类型 图片少于3时显示 -->
      <div class="post1" v-else-if="item.images.length <3">
        <el-row class="row5">
          <el-col :span="8">
            <nuxt-link :to="`/post/detail?id=${item.id}`">
              <div class="pic"
            :style="`background:url('${item.images[0]}') no-repeat center;background-size: cover;`"></div>
            </nuxt-link>
            
          </el-col>
          <el-col :span="16">
            <nuxt-link :to="`/post/detail?id=${item.id}`">
              <h3>{{item.title}}</h3>
            </nuxt-link>

            <!-- 文章 -->
            <nuxt-link :to="`/post/detail?id=${item.id}`">
              <div class="posttext" v-html="item.summary">
              </div>
            </nuxt-link>

            <!-- 定位坐标 -->
            <el-row class="row4" type="flex" justify="space-between">
              <el-col class="row4-left" :span="11">
                <el-row type="flex" justify="space-between">
                  <span>
                    <i class="el-icon-location-outline"></i>
                  </span>
                  <span>{{item.cityName}}</span>
                  <span>by</span>
                  <nuxt-link to="#">
                    <span
                      :style="`background:url('http://157.122.54.189:9095${item.account.defaultAvatar}') no-repeat center;background-size: 16px 16px;`"
                      class="avatar"
                    ></span>
                  </nuxt-link>
                  <nuxt-link to="#">
                    <span style="color:#ffa500">{{item.account.nickname}}</span>
                  </nuxt-link>

                  <span>
                    <i class="el-icon-view"></i>
                    {{item.watch}}
                  </span>
                </el-row>
              </el-col>
              <div class="row4-right">
                <span>{{item.like|likecount}}</span>
                <span>赞</span>
              </div>
            </el-row>
          </el-col>
        </el-row>
      </div>

    </div>
    <!-- 如果没有搜索到文章 -->
    <div class="row6" v-if="data.data.length===0">
      <p>没有搜索到任何文章</p>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search_input: "",
      pagenum: 1, // 当前页码
      pagesize:3  // 显示的页码条数
    };
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val
      this.$emit('pagenum',this.pagenum,val)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val
      this.$emit('pagenum',val,this.pagesize)
    },
    searchcity(){
        this.$emit('city',this.search_input)
    },
    recommendcity(city){
      this.search_input = city
      this.searchcity()
    },
    jumpppage(){
      this.$router.push('/post/traveldiary')
    }
  },
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    city:{
      type:String,
      default:''
    }
  },
  filters:{
    likecount(like){
      if(like===null){
        return 0
      }else{
        return like
      }
    }
  },
  watch:{
    city(val){
      this.search_input = val
    }
  }
};
</script>

<style scoped lang='less'>
.postmain {
  padding: 30px;

  .search {
    /deep/.el-input__inner {
      border: 3px solid #ffa500;
      border-radius: 0;
    }

    /deep/.el-input__icon {
      font-size: 20px;
      font-weight: 600;
      color: #ffa500;
    }
  }

  .row {
    color: #666;
    font-size: 12px;
    margin: 10px 0 0;

    .tuijiancity {
      display: inline-block;
      padding: 0px 3px;
      cursor: pointer;

      &:hover {
        color: #ffa500;
        text-decoration: underline;
      }
    }
  }

  .row2 {
    color: #ffa500;
    font-size: 18px;
    border-bottom: 1px solid #ddd;
    // padding-top: 10px;

    .text {
      border-bottom: 2px solid #ffa500;
      line-height: 50px;
      
    }
  }
  .post,
  .post1 {
    // border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 20px 0;

    h3 {
      font-weight: 400;
      font-size: 18px;
      color: #000;

      &:hover {
        color: #ffa500;
      }
    }
    .posttext {
      font-size: 14px;
      margin: 20px 0;
      height: 56px;
      overflow: hidden;
    }

    .row3 {
      height: 150px;

        > div {
            // display: inline-block;
          width: 220px;
          height: 150px;
          overflow: hidden;
        //   background: url("https://p3-q.mafengwo.net/s13/M00/41/C4/wKgEaVyaOs2AA9IKAAj8Lg2YzaU64.jpeg?imageMogr2%2Fthumbnail%2F1360x%2Fstrip%2Fquality%2F90")
        //     no-repeat center;
        //   background-size: cover;
        
      }
    }

    .row4 {
      margin-top: 10px;

      .row4-left {
        font-size: 12px;
        line-height: 20px;

        .avatar {
          display: inline-block;
          width: 16px;
          height: 16px;
          //   margin: 3px 5px;
          padding-top: 3px;
        }

        span {
          color: #999;
        }
      }

      .row4-right {
        color: #ffa500;
      }
    }
  }

  .post1 {
    .row5 {
      .pic {
        width: 220px;
        height: 150px;
        // background: url("https://p3-q.mafengwo.net/s13/M00/41/C4/wKgEaVyaOs2AA9IKAAj8Lg2YzaU64.jpeg?imageMogr2%2Fthumbnail%2F1360x%2Fstrip%2Fquality%2F90")
        //   no-repeat center;
        // background-size: cover;
      }

      h3{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .pagination {
    margin-top: 20px;
  }

  .row6{
    text-align: center;
  }
}
</style>
