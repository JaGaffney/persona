import { info } from './config.js';

class PersonaUI{

    static loadPersona() {
        for (let item in info["persona"]) {
            for (let persona in info["persona"][item]){
                let name = persona
                let arcana = item
                let level = info["persona"][item][persona]["data"]["level"]
                let cost = info["persona"][item][persona]["base_cost"]

                let physical = info["persona"][item][persona]["data"]["resistance"]["physical"]
                let gun = info["persona"][item][persona]["data"]["resistance"]["gun"]
                let fire = info["persona"][item][persona]["data"]["resistance"]["fire"]
                let ice = info["persona"][item][persona]["data"]["resistance"]["ice"]
                let electric = info["persona"][item][persona]["data"]["resistance"]["electric"]
                let wind = info["persona"][item][persona]["data"]["resistance"]["wind"]
                let psychic = info["persona"][item][persona]["data"]["resistance"]["nuclear"]
                let nuclear = info["persona"][item][persona]["data"]["resistance"]["nuclear"]
                let bless = info["persona"][item][persona]["data"]["resistance"]["bless"]
                let curse = info["persona"][item][persona]["data"]["resistance"]["curse"]

                PersonaUI.createPersona(name,
                                        arcana,
                                        level,
                                        cost,
                                        physical,
                                        gun,
                                        fire,
                                        ice,
                                        electric,
                                        wind,
                                        psychic,
                                        nuclear,
                                        bless,
                                        curse)
            }  
        }
    }

    static createPersona(   name,
                            arcana,
                            level,
                            cost,
                            physical,
                            gun,
                            fire,
                            ice,
                            electric,
                            wind,
                            psychic,
                            nuclear,
                            bless,
                            curse) {
        // get thee id
        const list = document.getElementById('persona-list')
        // declare what type of html you want
        const row = document.createElement('tr')

        while(cost.charAt(0) === '0'){
            cost = cost.substr(1)
        }

        row.innerHTML = `
            <td>${name}</td>
            <td>${arcana}</td>
            <td>${level}</td>
            <td>¥${cost}</td>
            <td>${physical}</td>
            <td>${gun}</td>
            <td>${fire}</td>
            <td>${ice}</td>
            <td>${electric}</td>
            <td>${wind}</td>
            <td>${psychic}</td>
            <td>${nuclear}</td>
            <td>${bless}</td>
            <td>${curse}</td>
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
