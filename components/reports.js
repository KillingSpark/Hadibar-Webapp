Vue.component('reports',
    {
        data: function () {
            return {
                showaccreport: false,
                txList: [],
                showtxreport: false,
                fromDate: "",
                toDate: ""
            }
        },
        props: ['accs'],
        template: `
    <div class="row">
    <div class="col">
    <button class="btn btn-secondary" v-on:click=call_account_report>Toggle AccountList</button>
    <br>
    <br>
    <div class="row">
    <div v-show="showaccreport">
        <table class="table">
            <th>Name</th><th>Value</th>
            <tbody>
                <tr v-bind:class='{"table-danger": acc.Value < 0, "table-success" : true}' v-for="acc in accs">
                    <td>{{acc.Owner.Name}}</td><td>{{acc.Value}}</td>
                </tr>
            </tbody>
        </table>
    </div>
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
    <div v-show="showtxreport">
        <table class="table">
            <th>Time</th><th>Source</th><th>Target</th><th>Amount</th>
            <tbody>
                <tr v-for="tx in txList">
                    <td>{{tx.Time}}</td><td>{{tx.Source}}</td><td>{{tx.Target}}</td><td>{{tx.Amount}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>`,
        methods: {
            call_account_report: function () {
                this.showaccreport = !this.showaccreport
            },
            call_tx_report: function () {
                this.showtxreport = !this.showtxreport
                if (this.showtxreport){
                    that = this
                    transactionReport("", this.fromDate, this.toDate, function (report) {
                        that.txList = report
                    }, displayError)
                }
            }
        }
    })
