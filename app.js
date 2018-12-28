import { info } from './config.js';

class PersonaUI{

    static loadPersona() {
        for (let item in info["persona"]) {
            for (let persona in info["persona"][item]){
                let name = persona
                let arcana = item
                let level = info["persona"][item][persona]["data"]["level"]
                let cost = info["persona"][item][persona]["base_cost"]
            
                PersonaUI.createPersona(name, arcana, level, cost)
            }  
        }
    }

    static createPersona(name, arcana, level, cost) {
        // get thee id
        const list = document.getElementById('persona-list')
        // declare what type of html you want
        const row = document.createElement('tr')

        row.innerHTML = `
            <td>${name}</td>
            <td>${arcana}</td>
            <td>${level}</td>
            <td>¥${cost}</td>
            <td><a href="#" class="btn btn-danager btn-sm delete">X</a></td>
        `

        list.appendChild(row)
    }

    static tableFilter() {
        // Declare variables 
        let input, filter, table, tr, td, i
        input = document.getElementById("search-bar")
        filter = input.value.toUpperCase()
        table = document.getElementById("persona-list")
        tr = table.getElementsByTagName("tr")

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0]
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = ""
                } else {
                    tr[i].style.display = "none"
                }
            } 
        }
    }
}


// Event: On website load, loads the JSON file and populates the table
document.addEventListener('DOMContentLoaded', PersonaUI.loadPersona)

// Events: Search bar
document.getElementById('search-bar').addEventListener('keyup', () => {
    PersonaUI.tableFilter()
})
