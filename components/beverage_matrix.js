Vue.component('bevmatrix', {
    data: function () {
            return {
                bevReportHtml: "",
            }
        }
    ,
    template: `
    <div>
        <div class="row d-print-none mb-md-3">
            <div class="col">
                <button class="btn btn-secondary d-print-none" v-on:click="call_beverage_report">Generate BeverageList</button>
                <button class="btn btn-secondary" v-on:click="print">Print</button>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div v-html=bevReportHtml></div>
            </div>
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
        print: function() {
            window.print();
        }
    }
})
