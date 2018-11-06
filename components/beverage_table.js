/// <reference path="../node_modules/@types/jquery/index.d.ts" />

Vue.component('bev-table', {
  data: function () {
    return {
      beverages: [],
      bev_value: 0,
      bev_name: ""
    }
  },
  props: ["current_account"],
  template:
    ` <div>
      <div class="row">
        <table id="bev_table" class="table-bordered table-hover col-md-3">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Times</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(bev, index) in beverages" v-bind:bev="bev">
                    <td>{{bev.Name}}</td>
                    <td class="center">{{bev.Value}}</td>
                    <td><input v-model="beverages[index].times" type="text" style="width: 100%" /></td>
                    <td class="danger center" v-on:click="call_delete(index)">X</td>
                </tr>
            </tbody>
        </table>
        <div class="col-md-6" id="makedrink">
            <span id="makedrinktext">MAKE ALL THE DRINKS!</span>
            <br>
            <input type="text" v-model="bev_name" placeholder="new name" />
            <input type="text" v-model="bev_value" placeholder="new value" />
            <br>
            <button style="margin-top: 1%;" class="col-md-2" v-on:click="call_add">Add</button>
          </div>
      </div>
      <div class="row">
        <button v-on:click="updateSelectedAccountWithSelectedBeverages">Execute</button>
      </div>
    </div>
    `,
  methods: {
    sum_selected_beverages: function (event) {
      var sum = 0
      for (var i = 0; i < this.beverages.length; i++) {
        sum += this.beverages[i].times * this.beverages[i].Value
      }
      return -sum
    },
    updateSelectedAccountWithSelectedBeverages: function () {
      comp = this
      updateAccount(this.current_account.ID, this.sum_selected_beverages(), this.current_account.Name, function (acc) {
        comp.current_account.Value = acc.Value
      }, displayError())
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
      newBeverage(this.bev_value, this.bev_name,
        function (response) {
          response.times = 0
          comp.beverages.push(response)
          alert(response.Name)
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
