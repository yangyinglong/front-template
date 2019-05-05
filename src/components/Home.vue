<template>
  <div class="home-carousel">
    <!-- <el-carousel indicator-position="outside" class="hello">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel> -->
   <!--  <button type="text" @click="toBespeak" class="button button-block button-rounded button-large" style="display:inline-block;position: absolute; top: 40%; left: 45%" v-if="this.$store.state.loginStatus === 2">点击审核</button> -->
    <button type="text" @click="toBespeak" class="button button-block button-rounded button-large" style="display:inline-block;position: absolute; top: 50%; left: 45%">点击填写</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'name'
    }
  },
  created(){
  },
  methods: {
    toBespeak() {
      if (this.$store.state.loginStatus != 0) {
        this.$router.push({name: 'Center', params: {}})
      } else {
        this.$notify.success({
          title: 'Info',
          message: '请先登录或注册！',
          position: 'top-left'
        })
      }
    }
  }

}
</script>

<style scoped>
.home-carousel {
  height: 530px;
  width: 100%;
  margin: 0 auto;
}

.button {
  color: #666;
  background-color: #EEE;
  border-color: #EEE;
  font-weight: 300;
  font-size: 16px;
  font-family: "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
  text-decoration: none;
  text-align: center;
  line-height: 40px;
  height: 40px;
  padding: 0 40px;
  margin: 0;
  display: inline-block;
  appearance: none;
  cursor: pointer;
  border: none;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition-property: all;
  transition-property: all;
  -webkit-transition-duration: .3s;
  transition-duration: .3s;
  /*
  * Disabled State
  *
  * The disabled state uses the class .disabled, is-disabled,
  * and the form attribute disabled="disabled".
  * The use of !important is only added because this is a state
  * that must be applied to all buttons when in a disabled state.
  */ 
}
.button-block,
.button-stacked {
  display: block;
}
.button-rounded {
  border-radius: 4px; 
}
.button-large {
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  padding: 0 50px;
}
</style>
