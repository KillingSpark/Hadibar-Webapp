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
            <form class="form-inline" v-on:submit="call_login">
                <input type="text" class="form-control form-control-sm mr-sm-1" v-model="name" placeholder="Name"/>
                <input type="password" class="form-control form-control-sm mr-sm-1" v-model="password" placeholder="Passwort"/>
                <button type="submit" class="btn btn-outline-light">LOGIN</button>
            </form>
        </div>
        <div v-if="!show_login">
            <form class="form-inline" v-on:submit="call_logout">
                <button type="submit" class="btn btn-outline-light">LOGOUT {{name}}</button>
            </form>
        </div>
    </div>
    `,
    methods:{
        call_login: function(e){
            e.preventDefault()
            that = this
            doLogin(this.name, this.password, function(res){
                that.show_login = false
            },
            function(msg){
                alert(msg)
            })
            return false
        },
        call_logout: function(e){
            e.preventDefault()
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
