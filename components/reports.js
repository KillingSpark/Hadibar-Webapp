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
    <div style="width:100%" v-html=accReportHtml></div>
    <br>
    <br>
    <button v-on:click=call_beverage_report>Generate BeverageList</button>
    <br>
    <br>
    <div style="width:100%" v-html=bevReportHtml></div>
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