/// <reference path="../node_modules/@types/jquery/index.d.ts" />

Vue.component('bev-table', {
  data: function () {
    return {
      beverages: [],
      bev_value: "",
      bev_avail: "",
      bev_name: "",
    }
  },
  computed:{
    targetacc: function() {
      target = {}
      this.accs.forEach( function(acc){
        if (acc.Owner.Name == "bank"){
          target = acc
        }
      }
      )
      return target
    }
  },
  props: ['current_account', 'accs'],
  template:
    ` <div>
      <div class="row">
      <div class="col-md-3">
      </div>
      </div>
      <div class="row">
        <table id="bev_table" class="table-bordered table-hover col-md-3">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Available</th>
                    <th>Times</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(bev, index) in beverages" v-bind:bev="bev">
                    <td>{{bev.Name}}</td>
                    <td class="center">{{bev.Value}}</td>
                    <td class="center">{{bev.Available}}</td>
                    <td><input v-model="beverages[index].times" type="text" style="width: 100%" /></td>
                    <td class="danger center" v-on:click="call_delete(index)">X</td>
                </tr>
            </tbody>
        </table>
        <div class="col-md-6" id="makedrink">
            <span id="makedrinktext">MAKE ALL THE DRINKS!</span>
            <br>
            <input type="text" v-model="bev_name" placeholder="name" />
            <input type="text" v-model="bev_value" placeholder="value in cents" />
            <input type="text" v-model="bev_avail" placeholder="how many" />
            <br>
            <button style="margin-top: 1%;" class="col-md-2" v-on:click="call_add">Add</button>
          </div>
      </div>
      <div class="row">
        <button v-on:click="call_transaction">Execute</button>
      </div>
    </div>
    `,
  methods: {
    select_target: function(idx) {
      this.targetacc = this.accs[idx]
    },
    sum_selected_beverages: function (event) {
      var sum = 0
      for (var i = 0; i < this.beverages.length; i++) {
        sum += this.beverages[i].times * this.beverages[i].Value
        updateBeverage(this.beverages[i].ID, this.beverages[i].Value, Number(this.beverages[i].Available)-Number(this.beverages[i].times), this.beverages[i].Name,
          function(){}, displayError)
      }
      this.updateBeverages()
      return -sum
    },
    call_transaction: function () {
      comp = this
      doTransaction(this.current_account.ID, this.targetacc.ID, -this.sum_selected_beverages(), function (acc) {
        bevapp.updateAccounts()
      }, displayError)
    },
    call_delete: function (index) {
      var comp = this
      deleteBeverage(comp.beverages[index].ID,
        function (response) {
          comp.beverages.splice(index, 1)
        }, displayError)
    },
    call_add: function () {
      var comp = this
      newBeverage(Number(this.bev_value), this.bev_name, Number(this.bev_avail),
        function (response) {
          response.times = 0
          comp.beverages.push(response)
        }, displayError)
    },
    updateBeverages: function () {
      var comp = this
      getBeverages(function (response) {
        comp.beverages = response
        comp.beverages.forEach(function (element) {
          element.times = 0
        }, this);
      }, displayError)
    },
  },
  created: function () {
    loginHooks.push(this.updateBeverages)
  }
})
