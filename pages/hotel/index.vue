<template>
    <div class="hotel-main">
        <!-- 面包屑导航 -->
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>酒店</el-breadcrumb-item>
                <el-breadcrumb-item>南京市酒店预订</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 住店信息组件 -->
        <div class="stayInfo">
            <StayInfo />
        </div>
        <!-- 景点和地图组件 -->
        <div class="scenicMap">
            <scenicInfo/>
        </div>
        <!-- 酒店筛选组件 -->
        <div class="hotelFilter">
            <HotelFilter />
        </div>
        <!-- 酒店列表组件 -->
        <div class="hotelList">123</div>
    </div>
</template>
<script>
import StayInfo from '@/components/hotel/stayInfo'
import scenicInfo from '@/components/hotel/scenicInfo'
import HotelFilter from '@/components/hotel/hotelFilter'
export default {
    components:{
        StayInfo,
        scenicInfo,
        HotelFilter
    },
    data(){
        return {
            hotelData:[]
        }
    },
    mounted(){
        this.$axios({
            url:'/hotels',
        }).then(res=>{
            this.hotelData = res.data.data
        })
    }
}
</script>
<style lang="less" scoped>
.hotel-main {
    width: 1000px;
    margin: 0 auto;
    .breadcrumb {
        padding: 20px 0;
    }
    .stayInfo {
        margin-bottom: 30px;
    }
    .scenicMap {
        margin-bottom: 30px;
    }
    .hotelFilter {
        margin-bottom: 30px;
    }
    .hotelList {
        background-color: skyblue;
        margin-bottom: 10px;
    }
}
</style>
