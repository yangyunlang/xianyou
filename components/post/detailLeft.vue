<template>
  <div class="detailLeft">
    <!-- 头部 -->
    <div class="tatil">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/hotel' }">旅游攻略</el-breadcrumb-item>
        <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 标题 -->
      <h1>{{data.title}}</h1>
      <p>攻略：{{data.updated_at|gettimer}} 阅读：{{data.watch}}</p>
    </div>
    <!-- 文章内容 -->
    <div class="content" v-html="html">{{html}}</div>
    <!-- 文章读者操作部分 -->
    <el-row class="edit" type="flex" justify="center">
      <div>
        <i class="iconfont iconpinglun"></i>
        <p>评论({{total}})</p>
      </div>
      <div @click="addCang">
        <i class="iconfont iconstar1"></i>
        <p>收藏</p>
      </div>
      <div>
        <i class="iconfont iconfenxiang"></i>
        <p>分享</p>
      </div>
      <div @click="addLike">
        <i class="iconfont iconding"></i>
        <p>点赞({{like}})</p>
      </div>
    </el-row>
    <!-- 发表评论部分 -->
    <div class="fabiao">
      <h4>评论</h4>
      <!-- 写评论框 -->
      <el-input
        class="textarea"
        type="textarea"
        :rows="2"
        placeholder="说点什么吧..."
        v-model="commData.content"
        resize="none"
      ></el-input>
      <el-row type="flex" justify="space-between">
        <!-- 文件上传 -->
        <div class="upload">
          <el-upload
            action="http://127.0.0.1:1337/upload"
            list-type="picture-card"
            :on-remove="handleRemove"
            :on-success="uploadAdd"
            :file-list="fileList"
            name="files"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImg" alt />
          </el-dialog>
        </div>
        <!-- 提交按钮 -->
        <div class="btn">
          <el-button type="primary" @click="commentsSubmit">提交</el-button>
        </div>
      </el-row>
    </div>
    <!-- 历史评论 -->
    <div class="history" v-if="total!==0">
      <div class="first" v-for="(first,index) in currCmtList" :key="index">
        <div class="user">
          <img :src="`${$axios.defaults.baseURL+first.account.defaultAvatar}`" alt />
          <span>{{first.account.nickname}}</span>
          <i>{{first.account.updated_at|gettimer}}</i>
        </div>
        <div class="second" v-if="first.parent">
          <!-- 组件 -->
          <Comment :data="first.parent">
          </Comment>
        </div>
        <p class="text">{{first.content}}</p>
        <nuxt-link to="#" @click.native="toreply(first)" class="reply">回复</nuxt-link>
      </div>
    </div>
    <!-- 评论为空时显示 -->
    <div class="empty" v-else>暂无评论，赶紧抢占沙发！</div>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSize"
      @current-change="handleCurrent"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      v-show="total!==0"
      class="fenye"
    ></el-pagination>
  </div>
</template>

<script>
import moment from "moment";
import Comment from "@/components/post/comment";
export default {
  components: {
    Comment
  },
  data() {
    return {
      data: {},
      html: "",
      dialogVisible: false,
      dialogImg: "",
      pagenum: 1,
      pagesize: 2,
      total: 2,
      // 当前页面评论数据
      currCmtList: [],
      like: 0,
      // 提交评论数据
      commData: {
        content: "", //文字内容
        pics: [], //图片
        post: this.$route.query.id, //评论id
        follow:{}
      },
      fileList:[]
    };
  },
  methods: {
    // 点击回复
    toreply(item){
      // console.log(item);
      this.commData.follow=item
    },
    // 提交评论
    commentsSubmit() {
      this.$axios({
        url: "/comments",
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        data: this.commData
      }).then(res => {
        this.$message.success(res.data.message);
        this.commData.content = "";
        this.commData.pics = [];
        this.fileList=[]
        this.commData.follow={}
        this.getComment();
      });
    },
    // 点赞文章
    addLike() {
      this.$axios({
        url: "/posts/like",
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        params: { id: this.$route.query.id }
      }).then(res => {
        this.$message.warning(res.message);
      });
    },
    // 收藏文章
    addCang() {
      this.$axios({
        url: "/posts/star",
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        params: { id: this.$route.query.id }
      }).then(res => {
        this.$message.warning(res.message);
      });
    },
    // 移除文件时触发
    handleRemove(file, fileList) {
      let arr=[file.response[0]]
      for (let i = 0; i < this.commData.pics.length; i++) {
       if(this.commData.pics[i]==out){
         this.commData.pics.splice(i,1)
       }
      }
    },
    // 文件上传成功时的钩子
    uploadAdd(response, file, fileList) {
      this.commData.pics.push(response[0]);
    },
    // 改变每页显示条数时触发
    handleSize(pagesize) {
      this.pagesize = pagesize;
      this.getComment();
    },
    // 改变当前页码时触发
    handleCurrent(pagenum) {
      this.pagenum = pagenum;
      this.getComment();
    },
    // 获取文章评论数据
    getComment() {
      this.$axios({
        url: "/posts/comments",
        params: {
          // 文章id
          post: this.$route.query.id,
          // _sort:'',// 排序
          // 条数
          _limit: this.pagesize,
          // 开始数据(分页)
          _start: (this.pagenum - 1) * this.pagesize
        }
      }).then(res => {
        this.total = res.data.total;
        this.currCmtList = res.data.data;
      });
    },
    // 获取文章数据
    getDetail() {
      this.$axios({
        url: "/posts",
        params: { id: this.$route.query.id }
      }).then(res => {
        this.data = res.data.data[0];
        this.html = this.data.content;
        if (this.data.like) {
          this.like = this.data.like;
        } else {
          this.like = 0;
        }
      });
    }
  },
  mounted() {
    // 获取文章数据
    this.getDetail();
    // 获取文章评论数据
    this.getComment();
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
      // 获取文章数据
      this.getDetail();
      // 获取文章评论数据
      this.getComment();
    }
  }
};
</script>
<style lang="less" scoped>
.detailLeft {
  width: 700px;
  padding: 20px 0;
  h1 {
    padding: 25px 0;
    border-bottom: 1px solid #ccc;
  }
  // p {
  //   text-align: right;
  //   color: #999;
  //   margin: 20px 10px;
  // }
}
.edit {
  margin: 50px 0 20px 0;
  div {
    cursor: pointer;
    margin: 0 20px;
    text-align: center;
    cursor: pointer;
    i {
      font-size: 30px;
      text-align: center;
      color: orange;
    }
    p {
      margin-top: 5px;
      font-size: 16px;
    }
  }
}
.fabiao {
  h4 {
    font-size: 18px;
    font-weight: normal;
  }
  .textarea {
    margin: 20px 0 10px 0;
  }
}
// 评论部分
.history {
  width: 100%;
  border: 1px solid #ccc;
  margin-top: 20px;
}

.first {
  border-bottom: 1px dashed #ccc;
  padding: 10px;
  & > p {
    padding-left: 20px;
  }
  span {
    font-size: 12px;
    color: #666;
  }
  i {
    font-size: 12px;
    color: #999;
  }
}
.user {
  img {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    vertical-align: middle;
  }
}
.text {
  font-size: 16px;
  color: #333;
  text-align: left;
}
.second {
  margin: 10px 0 0px 20px;
  padding: 8px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}

.level {
  float: right;
}
.reply {
  float: right;
  font-size: 12px;
  color: #666;
  margin-top: -7px;
  color: #1e50a2;
}
.empty {
  margin: 10px 0 10px;
  border: 1px dashed #ccc;
  padding: 20px;
  text-align: center;
  color: #999;
}
.fenye {
  margin-top: 10px;
  margin-left: 10px;
}
/deep/.el-upload {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
/deep/.el-upload-list__item {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
</style>
<style>
.content img {
  max-width: 100%;
  margin: 10px 0;
}
</style>
