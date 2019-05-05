<template>
	<div class="forgot-main">
		<el-form label-position='left' :model="forgotPassData" status-icon :rules="rules" ref="forgotPassData" label-width="100px" class="demo-ruleForm">
			<br><br>
			<el-form-item label="学号：" prop="stuId">
            	<el-input v-model="forgotPassData.stuId" placeholder="请输入学号"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
            	<el-input v-model="forgotPassData.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号码：" prop="phone">
            	<el-input v-model="forgotPassData.phone" placeholder="请输入手机号码"></el-input>
            </el-form-item>
			<el-form-item label="密码：" prop="password">
				<el-input type="password" v-model="forgotPassData.password" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="确认密码：" prop="checkPass">
				<el-input type="password" v-model="forgotPassData.checkPass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="" prop="validateCode">
				<!-- <el-input v-model.number="forgotPassData.validateCode" autocomplete="off" placeholder="请输入验证码">
					<div v-if="!sendMsgDisabled" slot="append" @click="sendSms(forgotPassData.phone)" style="width: 100px">{{sendVali}}</div>
					<div v-if="sendMsgDisabled" slot="append" style="width: 100px">{{time+'秒后获取'}}</div>
				</el-input> -->
				<br>
				<el-button style="width:310px; float: right; background-color: #d7d7d7;" @click="forgetPass('forgotPassData')">
				确认修改
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default{
		name: 'ForgotPass',
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.forgotPassData.checkPass !== '') {
						this.$refs.forgotPassData.validateField('checkPass');
					}
				callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.forgotPassData.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				forgotPassData: {
					stuId: '',
					name: '',
					phone: '',
					password: '',
					checkPass: ''
				},
				validateCodeId: '',
				rules: {
					phone: [
			            {required: true, message: '手机号码不能为空', trigger: 'blur'},
			            {min: 11, max: 11, message: '手机号码长度为11位数字值', trigger: 'blur'}
		        	],
					password: [
						{required: true, validator: validatePass, trigger: 'blur'}
					],
					checkPass: [
						{required: true, validator: validatePass2, trigger: 'blur'}
					],
					name: [
						{required: true, message: '姓名不能为空', trigger: 'blur'}
					],
					stuId: [
						{required: true, message: '姓名不能为空', trigger: 'blur'}
					],
				},
				sendMsgDisabled: false,
				time: 60,
				sendVali: '获取短信验证码'
			}
		},
		methods: {
			sendSms(phone){
				if (phone.length === 11) {
					// 调用后端发送短信接口
					this.validateCodeId = '100001'
					this.$message.success('已发送验证码！请查看手机。')
					let me = this
					me.sendMsgDisabled = true
					let interval = window.setInterval(function() {
						if ((me.time--) <= 0) {
							me.time = 60
							me.sendMsgDisabled = false         
							me.mess = '重新获取验证码'
							window.clearInterval(interval);
						}
					}, 1000);
				} else {
					this.$message.error('请填写正确的手机号码')
				}
			},
			forgetPass(forgotPassData){
				this.$refs[forgotPassData].validate((valid) => {
					if (valid) {
						var forgotPassFormData = {
							stuId: this.forgotPassData.stuId,
							name: this.forgotPassData.name,
							phone: this.forgotPassData.phone,
							password: this.forgotPassData.password
						}
						this.$http.ForgetPass(forgotPassFormData).then((result) => {
							if (result.c === 200) {
								sessionStorage.setItem('userId', result.r.stuId)
				                sessionStorage.setItem('userName', result.r.name)
				                sessionStorage.setItem('phone', result.r.phone)
				                sessionStorage.setItem('status', result.r.status)
				                this.$store.state.loginStatus = sessionStorage.getItem('status')
				                this.$store.state.userName = sessionStorage.getItem('userName')
				                this.setCookie(result.r.stuId, this.forgotPassData.password, 7, true)
								this.$message({
									message: '密码修改成功！',
									type: 'success'
								});
								this.$router.push({name: 'Home', params: {}})
							} else {
								this.$message.warning(result.r)
							}
						}, (err) => {
							this.$message.error(err.msg)
						})					
					} else {
						this.$alert('请完善注册信息', {
							dangerouslyUseHTMLString: true,
							showClose: false
						})
					}
				})
			},
			setCookie(c_name, c_pwd, exdays, remeberFlag) {
				var exdate = new Date(); //获取时间
				exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
				//字符串拼接cookie
				window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
				window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
				window.document.cookie = "remeberFlag" + "=" + remeberFlag + ";path=/;expires=" + exdate.toGMTString();
			}, 
		}

	}
</script>

<style scoped>
	.forgot-main{
		width: 400px;
		height: 530px;
		margin: 0 auto;
	}
</style>