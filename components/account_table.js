Vue.component('acc-select', {
  props: ['accs', 'selected_cb'],
  data: function(){return{
    selected_idx: -1
  }},
  template: `
    <select class="custom-select" style="width: 100%" v-model="selected_idx" v-on:change="on_change">
      <option disabled value="-1">Select an account</option>
      <option v-for="(acc, idx) in accs" v-bind:value="idx"> {{acc.Owner.Name}} </option>
    </select>
    `,
    methods: {
      on_change: function(){
        this.selected_cb(this.selected_idx)
      }
    }
})

Vue.component('acc-select-info', {
  props: ['accs', 'selected_cb'],
  data: function(){return {
    idx: -1,
  }},
  methods:{
    acc_selected_cb: function(idx) {
      this.idx = idx
      this.selected_cb(idx)
    }
  },
  computed: {
    isNegative: function () {
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
  <table id="acc_table" class="table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr v-bind:class='{"table-danger": isNegative, "table-success": !isNegative}'>
            <td><acc-select v-bind:selected_cb="acc_selected_cb" v-bind:accs="accs"></acc-select></td>
            <td>{{current_val}}</td>
        </tr>
    </tbody>
  </table>
  `
})

Vue.component('acc-info-table', {
  data: function () {
    return {
      difference: "",
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
        <div class="row mb-md-3">
          <div class="col">
            <acc-select-info v-bind:selected_cb="select_acc" v-bind:accs="accs"></acc-select-info>
          </div>
        </div>

        <div class="row mb-md-3">
          <div class="col">
              <form v-on:submit="call_delete">
                <button type="submit" class="btn btn-danger">Delete Account</button>
              </form>
          </div>
        </div>

        <div class="row mb-md-3">
          <div class="col">
            <form v-on:submit="make_payment">
              <div class="form-group">
                <label for="difference">Change Account Value</label>
                <input type="text" id="difference" class="form-control" v-model="difference" placeholder="Difference to add"/>
                <small class="form-text text-muted">
                  Changes the value of the account by adding the difference.
                </small>
              </div>
              <button type="submit" class="btn btn-secondary">Execute</button>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <form v-on:submit="call_add">
          <div class="form-group">
            <label for="new_acc">Add new account</label>
            <input type="text" class="form-control" id="new_acc" v-model="newname" placeholder="Name for the new account"/>
          </div>
          <button type=submit class="btn btn-secondary">Add</button>
        </form>
      </div>

      <div class="col-2"></div>

      <div class="col-md-4">
        <h2>Do transaction</h2>
        <form v-on:submit="call_transaction">
          <div class="form-group">
            <label for="tx_amount">Amount to transfer</label>
            <input type="text" class="form-control-sm form-control" v-model="transvalue" placeholder="Amount to transfer" id="tx_amount"/>
          </div>
          <div class="form-group">
            <label for="tx_source">Source account</label>
            <acc-select class="form-control-sm form-control" v-bind:selected_cb="select_source" v-bind:accs="accs" id="tx_source"></acc-select>
            <label for="tx_target">Target account</label>
            <acc-select class="form-control-sm form-control" v-bind:selected_cb="select_target" v-bind:accs="accs" id="tx_target"></acc-select>
          </div>
          <button type=submit class="btn btn-secondary">Execute</button>
        </form>
      </div>
    </div>
  </div>
  `,
  methods: {
    select_acc: function (idx) {
      this.account = this.accs[idx]
    },
    make_payment: function (e) {
      e.preventDefault()
      diff = Number(this.difference)
      comp = this
      doTransaction("0", this.account.ID, diff, function(res){
        comp.account.Value += diff
        comp.difference = ""
      }, displayError)
    },
    call_add: function(e) {
      e.preventDefault()
      comp = this
      newAccount(0, this.newname, function(newacc){
        comp.accs.push(newacc)
        comp.newname = ""
      }, displayError)
    },
    call_delete: function(e) {
      e.preventDefault()
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
    call_transaction: function(e){
      e.preventDefault()
      isempty = function (obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
      }
      comp = this
      if (isempty(this.sourceacc )){
        alert("no source account selected")
      }
      if (isempty(this.targetacc )){
        alert("no target account selected")
      }
      comp = this
      doTransaction(this.sourceacc.ID, this.targetacc.ID, Number(this.transvalue), function(res){
        bevapp.updateAccounts()
        comp.transvalue = 0
      }, displayError)
      return false
    }
  }
})
