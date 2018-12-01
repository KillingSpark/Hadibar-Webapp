Vue.component('bev-table', {
  data: function () {
    return {
      beverages: [],
      current_account: {},
      bev_value: "",
      bev_avail: "",
      bev_name: "",
    }
  },
  computed: {
    targetacc: function () {
      target = {}
      this.accs.forEach(function (acc) {
        if (acc.Owner.Name == "bank") {
          target = acc
        }
      }
      )
      return target
    }
  },
  props: ['accs'],
  template:
    ` <div>
      <div class="row">
      <div class="col-md-3">
      <h2>Payments</h2>
      <acc-select-info v-bind:selected_cb="select_source" v-bind:account="current_account" v-bind:accs="accs"></acc-select-info>
      <br>
      <form>
        <table id="bev_table" class="table-bordered table-hover col-md-3">
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Value</th>
                  <th>Times</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(bev, index) in beverages" v-bind:bev="bev">
                <td>{{bev.Name}}</td>
                <td class="center">{{bev.Value}}</td>
                <td><input v-model="beverages[index].times" type="text" style="width: 100%" /></td>
              </tr>
          </tbody>
        </table>
        <button type="submit" class="btn" v-on:click="call_transaction">Execute</button>
      </form>
      </div>
      <div class="col-md-3">
        <h2>Inventory</h2>
        <table id="bev_table" class="table-bordered table-hover col-md-3">
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Value</th>
                  <th>Available</th>
                  <th>Delete</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(bev, index) in beverages" v-bind:bev="bev">
                <td>{{bev.Name}}</td>
                <td class="center">{{bev.Value}}</td>
                <td class="center">{{bev.Available}}</td>
                <td class="danger" style="text-align: center; width: 100%;" v-on:click="call_delete(index)">X</td>
              </tr>
          </tbody>
        </table>
      </div>
      <div class="col-3" id="makedrink">
          <form>
          <h2 id="makedrinktext">New beverages</h2>
          <br>
          <div class="form-group">
          <input type=text class="form-text form-control form-control-sm" v-model="bev_name" placeholder="name" />
          <input type=text class="form-text form-control form-control-sm" v-model="bev_value" placeholder="value in cents" />
          <input type=text class="form-text form-control form-control-sm" v-model="bev_avail" placeholder="how many" />
          </div>
          <button type="submit" class="btn" v-on:click="call_add">Add</button>
          </form>
      </div>
      </div>
    </div>
    `,
  methods: {
    select_source: function (idx) {
      this.current_account = this.accs[idx]
    },
    sum_selected_beverages: function (event) {
      var sum = 0
      for (var i = 0; i < this.beverages.length; i++) {
        bev = this.beverages[i]
        sum += bev.times * bev.Value
      }
      return sum
    },
    updateAvailable: function () {
      for (var i = 0; i < this.beverages.length; i++) {
        bev = this.beverages[i]
        comp = this
        idx = i
        updateBeverage(bev.ID, bev.Value, Number(bev.Available) - Number(bev.times), bev.Name,
          function (resbev) { if(idx >= comp.beverages.length-1){comp.updateBeverages()}  }, displayError)
      }
    },
    call_transaction: function () {
      comp = this
      amount = this.sum_selected_beverages()
      doTransaction(this.current_account.ID, this.targetacc.ID, amount, function () {
        comp.current_account.Value -= amount
        comp.updateAvailable()
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
        if (response != null) {
          comp.beverages = response
          comp.beverages.forEach(function (element) {
            element.times = 0
          }, this);
        }
      }, displayError)
    },
  },
  created: function () {
    loginHooks.push(this.updateBeverages)
    comp = this
    logoutHooks.push(function () {
      comp.beverages = []
    })
  }
})
