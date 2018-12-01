Vue.component('reports',
    {
        data: function () {
            return {
                accReportHtml: "",
                bevReportHtml: "",
                txReportHtml: "",
            }
        },
        template: `
    <div>
    <button class="btn" v-on:click=call_account_report>Generate AccountList</button>
    <br>
    <br>
    <div class="row">
    <div class="col-md-3" v-html=accReportHtml></div>
    </div>
    <br>
    <br>
    <button class="btn" v-on:click=call_beverage_report>Generate BeverageList</button>
    <br>
    <br>
    <div class="row">
    <div class="col-md-12"> 
    <div v-html=bevReportHtml></div>
    </div>
    </div>
    <br>
    <br>
    <button class="btn" v-on:click=call_tx_report>Generate TransactionList</button>
    <br>
    <br>
    <div class="row">
    <div class="col-md-12"> 
    <div v-html=txReportHtml></div>
    </div>
    </div>
    </div>`,
        methods: {
            call_account_report: function () {
                that = this
                accountReport(function (report) {
                    that.accReportHtml = report
                }, displayError)
            },
            call_beverage_report: function () {
                that = this
                beverageReport(function (report) {
                    that.bevReportHtml = report
                }, displayError)
            },
            call_tx_report: function () {
                that = this
                transactionReport("", function (report) {
                    that.txReportHtml = report
                }, displayError)
            }
        }
    })