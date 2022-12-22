﻿document.addEventListener("DOMContentLoaded", ready);
function ready() {
    const html = document.getElementById("app");
    const { createApp } = Vue
    createApp({
        data() {
            var data = {
                tableName: html.dataset.tableName,
                row: JSON.parse(JSON.parse(html.dataset.rows)[0]),
                saveUrl: html.dataset.saveUrl,
                settings: {
                    serverType: "",
                    serverUrl: "",
                    username: "",
                    password: ""
                }
            };
            if (data.row["SettingJson"]) {
                data.settings = data.row["SettingJson"];
            }
            return data;
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
                var newRow = Object.assign({}, this.row);
                newRow["SettingJson"] = JSON.stringify(this.settings);
                form_data.append("data", JSON.stringify(newRow));

                var csrfHeader = $('meta[name="csrf-header"]').attr('content');
                var csrfToken = $('meta[name="csrf-token"]').attr('content');
                var headers = {};
                headers[csrfHeader] = csrfToken;

                axios.post(this.saveUrl, form_data, { headers });
            }
        }
    }).mount(html)
}