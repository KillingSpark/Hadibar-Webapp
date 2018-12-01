Vue.component('bevmatrix', {
    data: function () {
            return {
                bevReportHtml: "",
            }
        }  
    ,
    template: `
    <div class="row">
    <div class="col">
    <button class="btn" v-on:click=call_beverage_report>Generate BeverageList</button>
    <br>
    <br>
    <div v-html=bevReportHtml></div>
    </div>
    </div>
    `,
    methods: {
        call_beverage_report: function () {
            that = this
            beverageReport(function (report) {
                that.bevReportHtml = report
            }, displayError)
        },
    }
})