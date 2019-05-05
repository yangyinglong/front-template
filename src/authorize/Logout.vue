<template>
  <div class="content">
    <!-- <b style="color: #999999;">&nbsp|&nbsp</b> -->
    <router-link to="" style="text-decoration: none;"><b class="linked" @click="logout">退出</b></router-link>
  </div>

</template>

<script>
  // eslint-disable-next-line indent
  /* eslint-disable indent,indent,space-before-function-paren,no-unused-vars */

  // import $ from '@/api/axios.js';
  // import Qs from 'qs';

  export default {
    name: 'Logout',
    data() {
      return {
        dialogLoginVisible: false,
        // loginLable: '登录',
        loginform: {
          name: '',
          password: '',
          rememberPassword: false
        },
        loading: false,
        loginStatus: 0
      }
    },
    mounted() {
      this.getCookie();
    },
    methods: {
      logout: function () {
        this.$confirm('是否退出登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sessionStorage.clear()
          // this.$emit("changeStatus", 0)
          this.$store.dispatch('logout').then(() => {
            if (this.loginform.rememberPassword === false) {
              console.log("this " + this.loginform.rememberPassword)
              this.clearCookie()
            }
            this.$router.replace('/')
          })
          this.$message({
            type: 'success',
            message: '再见!'
          });
        }).catch(() => {         
        });        
      },
      //读取cookie
      getCookie: function() {
          if (document.cookie.length > 0) {
              var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
              for (var i = 0; i < arr.length; i++) {
                  var arr2 = arr[i].split('='); //再次切割
                  //判断查找相对应的值
                  if (arr2[0] == 'userName') {
                      this.loginform.name = arr2[1]; //保存到保存数据的地方
                  } else if (arr2[0] === 'userPwd') {
                      this.loginform.password = arr2[1];
                  } else if (arr2[0] === 'remeberFlag') {
                    if (arr2[1] === "true") {                    
                      this.loginform.rememberPassword = true;
                    } else {
                      this.loginform.rememberPassword = false;
                    }
                  }
              }
          }
      },
      setCookie(c_name, c_pwd, exdays, remeberFlag, status) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "remeberFlag" + "=" + remeberFlag + ";path=/;expires=" + exdate.toGMTString();
      }, 
      //清除cookie
      clearCookie: function() {
         this.setCookie("", "", -1, "", 0); //修改2值都为空，天数为负1天就好了
      }
    }
  }

</script>

<style scoped>

</style>
