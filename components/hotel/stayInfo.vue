<template>
    <div class="stayInfo">
        <el-form :model="form" class="stayInfo-search">
            <el-form-item>
                <!-- fetch-suggestions 返回输入建议的方法 -->
                <!-- select 点击选中建议项时触发 -->
                <!-- elementUI input 下拉列表 -->
                <el-autocomplete
                    :fetch-suggestions="queryCitySearch"
                    placeholder="目的地"
                    @select="handleCitySelect"
                    class="el-autocomplete"
                    v-model="form.city"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item>
                <el-date-picker
                    v-model="form.time"
                    type="datetimerange"
                    range-separator="-"
                    start-placeholder="入住日期"
                    end-placeholder="离店日期"
                ></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-input></el-input>
            </el-form-item>
            <el-button type="primary" style="height:40px">查看价格</el-button>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value1: "",
            value2: "",
            cityData: [],
            form: {
                city: "",
                time: "",
                users: {},
                man: "",
                children: ""
            }
        };
    },
    methods: {
        // 城市搜索框发生变化时调用,获取焦点时触发
        queryCitySearch(value, cb) {
            if (!value) {
                cb([]);
                return;
            }

            this.$axios({
                url: "/cities",
                params: {
                    name: value
                }
            }).then(res => {
                console.log(res)
                let arr = [];
                res.data.data.forEach(item => {
                    arr.push({ value: item.name });
                });
                cb(arr);
            });
        },
        // 点击选中建议项时触发 返回选中建议值
        handleCitySelect(val) {
            this.form.city = val;
        },
        showUserInfo() {
            console.log(123);
        },
        hiddenUserInfo() {
            console.log(520);
        }
    }
};
</script>
<style lang="less" scoped>
.stayInfo {
    .stayInfo-search {
        display: flex;
        div {
            margin-right: 5px;
        }
    }
}
</style>
