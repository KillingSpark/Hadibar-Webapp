var bevapp = new Vue({
  el: '#app',
  data: {
    show_bevs: true,
    show_accs: false,
    show_reports: false,
    show_bevmatrix: false,
    show_user: false,
    accounts: [],
  },
  methods: {
    selectNewAcc: function (idx) { 
      this.current_account = this.accounts[idx]
    },
    openApp: function (event, app_name) {
      if (app_name === 'bevs') {
        this.show_bevs = true
        this.show_accs = false
        this.show_reports = false
        this.show_bevmatrix = false
        this.show_user= false
      }
      if (app_name === 'accs') {
        this.show_bevs = false
        this.show_accs = true
        this.show_reports = false
        this.show_bevmatrix = false
        this.show_user= false
      }
      if (app_name === 'reports') {
        this.show_bevs = false
        this.show_accs = false
        this.show_reports = true
        this.show_bevmatrix = false
        this.show_user= false
      }
      if (app_name === 'bevmatrix') {
        this.show_bevs = false
        this.show_accs = false
        this.show_reports = false
        this.show_bevmatrix = true
        this.show_user= false
      }
      if (app_name === 'user') {
        this.show_bevs = false
        this.show_accs = false
        this.show_reports = false
        this.show_bevmatrix = false
        this.show_user= true
      }
    },
    updateAccounts: function () {
      var app = this
      getAccounts(function (response) {
        app.accounts = response
        app.current_account = app.accounts[0]
      }, displayError)
    }
  },
created: function () {
  getSessionIDAndThen(function(){})
  loginHooks.push(this.updateAccounts)
  app = this
  logoutHooks.push(function(){
    app.accounts = []
  })
}
})



