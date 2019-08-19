<template>
  <div class="detail">
    <el-row type="flex" justify="space-between">
      <!-- 旅游攻略详情左边 -->
      <DetailLeft />
      <!-- 旅游攻略详情右边 -->
      <DetailRight />
    </el-row>
  </div>
</template>

<script>
import DetailLeft from "@/components/post/detailLeft";
import DetailRight from "@/components/post/detailRight";

export default {
  components: {
    DetailLeft,
    DetailRight
  }
};
</script>
<style lang="less" scoped>
.detail {
  width: 1000px;
  margin: 0 auto;
}
</style>
