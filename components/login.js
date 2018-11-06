/// <reference path="../node_modules/@types/jquery/index.d.ts" />

Vue.component('login-form', {
    data: function () {
        return {
            name: "",
            password: "",
            show_login: true
        }
    },
    template: `
        <div class="navbar navbar-fixed-bottom">
            <div v-if="show_login">
                <span id="logintext">Log your ass in!</span>
                <input type=text v-model="name" placeholder="Name"/>
                <input type=password v-model="password" placeholder="Passwort"/>
                <button class="login_button" v-on:click="call_login">LOGIN</button>
            </div>
            <div v-if="!show_login">
                <span id="logintext">Log your ass out!</span>
                <button class="login_button" v-on:click="call_logout">LOGOUT</button>
            </div>
        </div>
    `,
    methods:{
        call_login: function(){
            that = this
            doLogin(this.name, this.password, function(res){
                that.show_login = false
            },
            function(msg){
                alert(msg)
            })
        },
        call_logout: function(){
            that = this
            doLogout(function(res){
                that.show_login = true
            },
            function(msg){
                alert(msg)
            })
        }
    }
})