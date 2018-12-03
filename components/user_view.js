Vue.component('user-update-form',
    {
        data: function () {
            return {
                currentemail: "",
                newemail: "",
            }
        },
        template: `
    <div class="row">
    <div class="col">
    <form>
    <label for="newemail">Current email: {{currentemail}}</label>
    <input type=email v-model="newemail" class="form-control form-text" placeholder="new email"/>
    <button class="btn" v-on:click="call_set_email" type=submit>Submit</button>
    </form>
    </div>
    </div>`,
        methods: {
            call_set_email: function () {
                if (this.newemail != this.currentemail) {
                    comp = this
                    setEmail(this.newemail, function(){
                        comp.currentemail = comp.newemail
                    }, displayError)
                }
                return false
            }
        },
        created: function() {
            comp = this
            loginHooks.push(function(){
                getUser(function(resp){
                    comp.currentemail = resp.Email
                }, displayError)
            })
        }
    })