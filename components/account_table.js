Vue.component('acc-option', {
  props: ['name', 'idx', 'selected_cb'],
  template: `<option v-on:click="selected_cb(idx)"> {{name}} </option>`,
})

Vue.component('acc-select', {
  props: ['accs', 'selected_cb'],
  template: `
    <select style="width: 100%">
      <acc-option v-for="(acc, idx) in accs" v-bind:selected_cb="selected_cb" v-bind:key="idx" v-bind:idx="idx" v-bind:name="acc.Owner.Name" />
    </select>
    `
})

Vue.component('acc-select-info', {
  props: ['accs', 'selected_cb'],
  data: function(){return {
    idx: 0,
  }},
  methods:{
    acc_selected_cb: function(idx) {
      this.idx = idx
      this.selected_cb(idx)
    }
  },
  computed: {
    isNegativ: function () {
      return this.current_val < 0
    },
    current_val: function() {
      if (typeof this.accs[this.idx] != 'undefined'){
        return this.accs[this.idx].Value
      }
      return 0
    }
  },
  template: `
  <table style="width: 100%;" id="acc_table" class="table-bordered">
    <thead>
        <tr>
            <th>Name</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><acc-select v-bind:selected_cb="acc_selected_cb" v-bind:accs="accs"></acc-select></td>
            <td v-bind:class="{danger: isNegativ, success: !isNegativ}">{{current_val}}</td>
        </tr>
    </tbody>
  </table>
  `
})

Vue.component('acc-info-table', {
  data: function () {
    return {
      difference: 0,
      newname: "",
      transvalue: 0,
      sourceacc: {},
      targetacc: {},
      account: {}
    }
  },
  props: ['accs'],
  template: `
  <div>
    <div class="row">
    <div class="col-md-3">
      <acc-select-info v-bind:selected_cb="select_acc" v-bind:accs="accs"></acc-select-info>
      <button class="btn" v-on:click=call_delete>Delete Account</button>
      <br>
      <form>
        <span>Change value of the account</span>
        <br>
        <input type="text" class="form-text" v-model="difference" placeholder="Difference to add to the account"/>
        <br>
        <button type="submit" class="btn" v-on:click=make_payment>Execute</button>
      </form>
    </div>
    
    <div class="col-md-3">
      <form class="">
      <label for="new_acc">Add new account</label>
      <input type="text" class="form-text" id="new_acc" v-model="newname" placeholder="Name for the new account"/>
      <button type=submit class="btn" v-on:click=call_add>Add</button>
      </form>
    </div>
    </div>

    <hr>

    <div class="row">
    <div class="col-md-3">
      <h1>Do transaction</h1>
      <form>
        <label for="tx_amount">Amount to transfere</label>
        <input type="text" v-model="transvalue" placeholder="Amount to transfere from left to right" id="tx_amount"/>
        <label for="tx_source">Source account</label>
        <acc-select v-bind:selected_cb="select_source" v-bind:accs="accs" id="tx_source"></acc-select>
        <label for="tx_target">Target account</label>
        <acc-select v-bind:selected_cb="select_target" v-bind:accs="accs" id="tx_target"></acc-select>
        <button type=submit class="btn" v-on:click=call_transaction>Execute</button>
      </form>
    </div>
    </div>

    <hr>
  </div>  
  `,
  methods: {
    select_acc: function (idx) {
      this.account = this.accs[idx]
    },
    make_payment: function () {
      diff = Number(this.difference)
      comp = this
      doTransaction("0", this.account.ID, diff, function(res){
        comp.account.Value += diff
      }, displayError)
    },
    call_add: function() {
      comp = this
      newAccount(0, this.newname, function(newacc){
        bevapp.accounts.push(newacc)
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