Vue.component('reports',
    {
        data: function () {
            return {
                accReportHtml: "",
                bevReportHtml: "",
            }
        },
        template: `
    <div>
    <button v-on:click=call_account_report>Generate AccountList</button>
    <br>
    <br>
    <div class="row">
    <div class="col-md-3" v-html=accReportHtml></div>
    </div>
    <br>
    <br>
    <button v-on:click=call_beverage_report>Generate BeverageList</button>
    <br>
    <br>
    <div class="row">
    <div class="col-md-12"> 
    <div v-html=bevReportHtml></div>
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
            }
        }
    })