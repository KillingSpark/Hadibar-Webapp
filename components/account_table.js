/// <reference path="../node_modules/@types/jquery/index.d.ts" />

Vue.component('acc-option', {
  props: ['name', 'index', 'selected_cb'],
  template: `<option v-on:click="selected_cb(index)"> {{name}} </option>`,
  methods:{
    select_account: function(){
      bevapp.selectNewAcc(this.index)
    }
  }
})

Vue.component('acc-select', {
  props: ['accs', 'selected_cb'],
  template: `
    <select style="width: 100%">
      <acc-option v-for="(acc, index) in accs" v-bind:selected_cb="selected_cb" v-bind:key="acc" v-bind:name="acc.Owner.Name" v-bind:index="index" />
    </select>
    `
})

Vue.component('acc-info-table', {
  data: function () {
    return {
      difference: 0,
      newname: "",
      transvalue: 0,
      sourceacc: {},
      targetacc: {}
    }
  },
  computed: {
    isNegativ: function () {
      return Number(this.account.Value) < 0
    }
  },
  props: ['account', 'show_payment', 'accs', 'selected_cb'],
  template: `
  <div>
    <div class="row">
      <table id="acc_table" class="table-bordered col-md-3">
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Value</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td><acc-select v-bind:selected_cb="selected_cb" v-bind:accs="accs"></acc-select></td>
                  <td v-bind:class="{danger: isNegativ, success: !isNegativ}">{{account.Value}}</td>
              </tr>
          </tbody>
      </table>
    </div>
      <button v-if="show_payment" v-on:click=call_delete>Delete Account</button>
      
      <br><br>
      <div v-if="show_payment" class="row">
        <hr>
        <h1>Change value of the account</h1>
        <input type="text" v-model="difference" placeholder="Difference to add to the account"/>
        <button v-on:click=make_payment>Execute</button>
        <hr>
        <br>
        <h1>Do transaction</h1>
        <input type="text" v-model="transvalue" placeholder="Amount to transfere from left to right"/>
        <div class="row">
        <div class="col-md-3">
        <acc-select v-bind:selected_cb="select_source" v-bind:accs="accs"></acc-select>
        <acc-select v-bind:selected_cb="select_target" v-bind:accs="accs"></acc-select>
        </div>
        </div>
        <button v-on:click=call_transaction>Add</button>
        <hr>
        <h1>Add new account</h1>
        <br>
        <input type="text" v-model="newname" placeholder="Name for the new account"/>
        <button v-on:click=call_add>Add</button>
        <br>
        <br>
        <hr>
        <h1>Generate all the reports</h1>
        <reports></reports>
      </div>
    </div>
  `,
  methods: {
    make_payment: function () {
      diff = Number(this.difference)
      //updateAccount(this.account.ID, diff, this.account.Owner.Name, function(newacc){
      //  bevapp.updateAccounts()
      //}, displayError)
      doTransaction("0", this.account.ID, diff, function(res){
        bevapp.updateAccounts()
      }, displayError)
    },
    call_add: function() {
      comp = this
      newAccount(0, this.newname, function(newacc){
        bevapp.updateAccounts()
      }, displayError)
    },
    call_delete: function() {
      comp = this
      deleteAccount(this.account.ID, function(){
        bevapp.updateAccounts()
      }, displayError)
    },
    select_target: function(idx){
      this.targetacc = this.accs[idx]
    },
    select_source: function(idx){
      this.sourceacc = this.accs[idx]
    },
    call_transaction: function(){
      isempty = function (obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
      }
      comp = this
      if (isempty(this.sourceacc )){
        this.sourceacc = this.accs[0]
      }
      if (isempty(this.targetacc )){
        this.targetacc = this.accs[0]
      }
      doTransaction(this.sourceacc.ID, this.targetacc.ID, Number(this.transvalue), function(res){
        bevapp.updateAccounts()
      }, displayError)
    }
  }
})