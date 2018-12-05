Vue.component('reports',
    {
        data: function () {
            return {
                accReportHtml: "",
                showaccreport: true,
                txReportHtml: "",
                showtxreport: false,
                fromDate: "",
                toDate: ""
            }
        },
        template: `
    <div class="row">
    <div class="col">
    <button class="btn" v-on:click=call_account_report>Generate AccountList</button>
    <br>
    <br>
    <div class="row">
    <div class="col-md-3" v-show="showaccreport" v-html=accReportHtml></div>
    </div>
    <br>
    <br>
    <form>
    <input v-model="fromDate" type="date" class="form-control form-text" placeholder="Earliest date DD.MM.YYYY" />
    <input v-model="toDate" type="date" class="form-control form-text" placeholder="Lastest date DD.MM.YYYY" />
    <button type=submit class="btn" v-on:click=call_tx_report>Generate TransactionList</button>
    </form>
    <br>
    <br>
    <div class="row">
    <div class="col-md-12"> 
    <div v-show="showtxreport" v-html=txReportHtml></div>
    </div>
    </div>
    </div>
    </div>
    </div>`,
        methods: {
            call_account_report: function () {
                this.showaccreport = !this.showaccreport
                if (this.showaccreport){
                    that = this
                    accountReport(function (report) {
                        that.accReportHtml = report
                    }, displayError)
                }
            },
            call_tx_report: function () {
                this.showtxreport = !this.showtxreport
                if (this.showtxreport){
                    that = this
                    transactionReport("", this.fromDate, this.toDate, function (report) {
                        that.txReportHtml = report
                    }, displayError)
                }
            }
        }
    })