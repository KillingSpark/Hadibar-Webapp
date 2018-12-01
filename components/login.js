Vue.component('login-form', {
    data: function () {
        return {
            name: "",
            password: "",
            show_login: true
        }
    },
    template: `
    <div>
        <div v-if="show_login">
            <form class="form-inline">
                <input type=text class="form-text form-control form-control-sm" v-model="name" placeholder="Name"/>
                <input type=password class="form-text form-control form-control-sm" v-model="password" placeholder="Passwort"/>
                <button type="submit" class="btn btn-primary" v-on:click="call_login">LOGIN</button>
            </form>
        </div>
        <div v-if="!show_login">
            <button type="submit" class="btn btn-primary" v-on:click="call_logout">LOGOUT {{name}}</button>
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