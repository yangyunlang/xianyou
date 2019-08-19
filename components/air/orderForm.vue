<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info" v-for="(item,index) in form.users" :key="index">
        <div class="member-info-item">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" v-show="index!=0" @click="delUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="addUser">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in data.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×${form.users.length}  最高赔付${item.compensation}`"
            border
            @change="baoxian(item.id,index)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="form.contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="form.contactPhone">
              <template slot="append">
                <el-button @click="setCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="form.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-checkbox label="是否需要发票" border></el-checkbox>
        <el-button type="warning" class="submit" @click="orderSubmit">提交订单</el-button>
      </div>
      
        <!-- 调用allpice让总价开始计算 -->
        <input type="hidden" :value="allPrice">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 机票数据
    data: {
      type: Object,
      default: { insurances: [], seat_infos: {} }
    }
  },
  data() {
    return {
      //乘机人的所有信息
      form: {
        //乘机人数据列表，里面每一项都是对象{username,id}
        users: [{ username: "", id: "" }],
        insurances: [], //乘机人选择的保险id组成的数组
        contactName: "", //联系人名字
        contactPhone: "", //联系人电话
        captcha: "", //手机验证码
        invoice: false, //是否需要发票
        seat_xid: this.$route.query.seat_xid, //座位id
        air: this.$route.query.id //航班id
      }
    };
  },
  methods: {
    // 提交订单
    orderSubmit() {
      let bl = true;
      this.form.users.forEach(v => {
        if (v.username == "") {
          this.$message.warning("请输入姓名");
          bl = false;
          return;
        }
        if (v.id == "") {
          this.$message.warning("请输入证件号码");
          return;
        }
      });
      if (!bl) {
        return;
      }
      if (this.form.contactName == "") {
        this.$message.warning("请输入联系人");
        return;
      }
      if (this.form.contactPhone == "") {
        this.$message.warning("请输入联系人手机号");
        return;
      }
      if (this.form.captcha == "") {
        this.$message.warning("请输入验证码");
        return;
      }
      this.$axios({
        url: "/airorders",
        method: "POST",
        data: this.form,
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        this.$message.success("订单成功提交，正在跳转")
        setTimeout(()=>{
          this.$router.push({
            path:'/air/pay',
            query:{id:res.data.data.id}
          })
        },1000)
      });
    },
    // 点击保险时触发
    baoxian(id, index) {
      if (this.form.insurances.indexOf(id) > -1) {
        this.form.insurances.splice(index, 1);
      } else {
        this.form.insurances.push(id);
      }
    },
    // 发送手机验证码
    setCaptcha() {
      if (!this.form.contactPhone) {
        this.$message.warning("请先输入手机号");
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: { tel: this.form.contactPhone }
      }).then(res => {
        this.$alert(`模拟手机验证码为:${res.data.code}`, "提示", {
          type: "warning"
        });
      });
    },
    // 添加乘机人
    addUser() {
      this.form.users.push({ username: "", id: "" });
    },
    // 删除乘机人
    delUser(index) {
      this.form.users.splice(index, 1);
    }
  },
  // 监听订单信息
  computed: {
    allPrice() {
      if (!this.data.seat_infos) {
        return 0;
      }
      let price = 0;
      price += this.data.seat_infos.org_settle_price;
      price += this.data.airport_tax_audlet;
      price+=this.form.insurances.length*30
      price*=this.form.users.length
      this.$emit("setAllprice", price);
      return price;
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: block;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>