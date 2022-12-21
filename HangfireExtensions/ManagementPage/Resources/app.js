document.addEventListener("DOMContentLoaded", ready);
function ready() {
    const html = document.getElementById("app");
    const { createApp } = Vue
    createApp({
        data() {
            return {
                tableName: html.dataset.tableName,
                rows: JSON.parse(html.dataset.rows),
                saveUrl: html.dataset.saveUrl
            }
        },
        methods: {
            remove(rowIndex) {
                this.rows.splice(rowIndex, 1);
            },
            add() {
                this.rows.push("");
            },
            save() {
                var form_data = new FormData();
                form_data.append("tableName", this.tableName);
                
                for (var index in this.rows) {
                    form_data.append("data", this.rows[index]);
                }

                var csrfHeader = $('meta[name="csrf-header"]').attr('content');
                var csrfToken = $('meta[name="csrf-token"]').attr('content');
                var headers = {};
                headers[csrfHeader] = csrfToken;

                axios.post(this.saveUrl, form_data, { headers });
            }
        }
    }).mount(html)
}