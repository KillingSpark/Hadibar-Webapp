Vue.component('reports',
    {
        data: function () {
            return {
                accReportHtml: "",
                showaccreport: false,
                txReportHtml: "",
                showtxreport: false,
                fromDate: "",
                toDate: ""
            }
        },
        template: `
    <div class="row">
    <div class="col">
    <button class="btn btn-secondary" v-on:click=call_account_report>Generate AccountList</button>
    <br>
    <br>
    <div class="row">
    <div class="col-md-3" v-show="showaccreport" v-html=accReportHtml></div>
    </div>
    <br>
    <br>
    <div class="row">
    <div class="col-md-3">
    <form class="">
        <div class="form-group">
            <label for="tx_date_from">From date</label>
            <input id="tx_date_from" v-model="fromDate" type="date" class="form-control" placeholder="Earliest date DD.MM.YYYY" />
            <label for="tx_date_from">To date</label>
            <input id="tx_date_to" v-model="toDate" type="date" class="form-control" placeholder="Lastest date DD.MM.YYYY" />
        </div>
        <button type=submit class="btn btn-secondary" v-on:click=call_tx_report>Generate TransactionList</button>
    </form>
    </div>
    </div>
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
