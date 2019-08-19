<template>
  <div class="hotel-filter">
    <el-row class="filterClassify">
      <el-col :span="4">
        <el-row type="flex" justify="space-between">
          <span>价格</span>
          <span>0-4000</span>
        </el-row>
        <el-row>
          <el-slider v-model="value"></el-slider>
        </el-row>
      </el-col>
      <el-col :span="5">
          <el-row>
              <span>住宿等级</span>
          </el-row>
          <el-row>
              
          </el-row>
      </el-col>
      <el-col :span="5">2</el-col>
      <el-col :span="5">2</el-col>
      <el-col :span="5">2</el-col>
    </el-row>
  </div>
</template>
<script>
export default {
    data(){
        return {
            value:0
        }
    }
};
</script>
<style lang="less" scoped>
.filterClassify {
  padding: 10px 20px;
  border: 1px solid #eaeaea;
  div {
    font-size: 14px;
    padding-right: 10px
  }
}
</style>
