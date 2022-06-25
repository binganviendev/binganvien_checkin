const sheetId = '1f6NzXNVfJKK_xAVFr4beBoBD3gJ6zmalTigWN_G5g5A';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const apiKey = "AIzaSyBP8s-zVM5K7qLT5hbmsxy0xpQWtURwmD0";
const tab_name = "Answers";

const url = 'https://sheets.googleapis.com/v4/spreadsheets/' +
           sheetId + '/values/' + tab_name +
           '?alt=json&key=' + apiKey;

const data = []

document.addEventListener('DOMContentLoaded', init)
function init() {
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            //Remove additional text and extract only JSON:
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            console.log(jsonData)
 
            const colz = [];
            const tr = document.createElement('tr');
            //Extract column labels
            jsonData.table.cols.forEach((heading) => {
                if (heading.label) {
                    let column = heading.label;
                    colz.push(column);
                    const th = document.createElement('th');
                    th.innerText = column;
                    tr.appendChild(th);
                }
            })
            output.appendChild(tr);
 
            //extract row data:
            jsonData.table.rows.forEach((rowData) => {
                const row = {};
                colz.forEach((ele, ind) => {
                    row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                })
                data.push(row);
            })
            processRows(data);
        })
}
