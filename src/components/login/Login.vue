<template>
    <div class="wrapper">
        <form class="form-signin">
            <b-alert
                    :show="dismissCountDown"
                    dismissible
                    variant="danger"
                    @dismissed="dismissCountDown=0"
                    @dismiss-count-down="countDownChanged"
            >
                {{ errorMessage }}
            </b-alert>
            <h2 class="form-signin-heading text-center">Login</h2>
            <input v-model="username" type="email" class="form-control" name="username" placeholder="Email@Addr.ess" required autofocus />
            <input v-model="password" type="password" class="form-control" name="password" placeholder="Password" required />
            <button class="btn btn-lg btn-primary btn-block" type="button" @click="handleSubmit">Login</button>
        </form>
    </div>
</template>

<script>

    import { auth } from '../../auth';
    export default {
        data () {
            return {
                error: false,
                errorMessage: '',
                username: '',
                password: '',
                dismissSecs: 3,
                dismissCountDown: 0
            }
        },
        created(){
            const self = this;
            if(localStorage.getItem('access_token') !== null){
                auth.verifyAuth().then(response => {
                   if(response.hasOwnProperty('token')){
                       self.$router.push('home');
                   }
                });
            }
        },
        watch:{
            username(newVal){
                if (newVal.length > 0) {
                    this.error = false;
                    this.countDownChanged(0);
                }
            }
        },
        methods: {
            handleSubmit () {
                const self = this;
                if (this.username && this.password) {
                    let mail = this.username.toLocaleLowerCase();
                    let creds = {email:mail, pass:this.password};
                    auth.login(creds).then(resp => {
                        if(!resp){
                            self.errorMessage = self.$t('login.failedLogin');
                            self.showAlert();
                        }else{
                            self.$router.push('home');
                        }
                    });
                }else{
                    this.errorMessage = this.$t('login.enterCredentials');
                    this.showAlert();
                }
            },
            handleError(msg){
                this.errorMessage = msg;
                this.error = true;
            },
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            showAlert() {
                this.dismissCountDown = this.dismissSecs
            }
        }
    };
</script>

<style scoped>
    .wrapper {
        margin-top: 80px;
        margin-bottom: 80px;
    }

    .form-signin {
        max-width: 380px;
        padding: 15px 35px 45px;
        margin: 0 auto;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .form-signin label {
        margin-left: 20px;
    }

    .form-signin-heading,
    .checkbox {
        margin-bottom: 30px;
    }

    .checkbox {
        font-weight: normal;
    }

    input[type="email"] {
        margin-bottom: -1px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    input[type="password"] {
        margin-bottom: 20px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

</style>
