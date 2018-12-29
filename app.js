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

                let strength = info["persona"][item][persona]["data"]["stats"]["strength"]
                let magic = info["persona"][item][persona]["data"]["stats"]["magic"]
                let endurance = info["persona"][item][persona]["data"]["stats"]["endurance"]
                let agility = info["persona"][item][persona]["data"]["stats"]["agility"]
                let luck = info["persona"][item][persona]["data"]["stats"]["luck"]


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
                                        curse,
                                        strength,
                                        magic,
                                        endurance,
                                        agility,
                                        luck)
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
                            curse,
                            strength,
                            magic,
                            endurance,
                            agility,
                            luck) {
        // get thee id
        const list = document.getElementById('persona-list')
        // declare what type of html you want
        const row = document.createElement('tr')

        while(cost.charAt(0) === '0'){
            cost = cost.substr(1)
        }

        let physicalColour = PersonaUI.resColour(physical)
        let gunColour = PersonaUI.resColour(gun)
        let fireColour = PersonaUI.resColour(fire)
        let iceColour = PersonaUI.resColour(ice)
        let electricColour = PersonaUI.resColour(electric)
        let windColour = PersonaUI.resColour(wind)
        let psychicColour = PersonaUI.resColour(psychic)
        let nuclearColour = PersonaUI.resColour(nuclear)
        let blessColour = PersonaUI.resColour(bless)
        let curseColour = PersonaUI.resColour(curse)

        row.innerHTML = `
            <td>${name}</td>
            <td>${arcana}</td>
            <td>${level}</td>
            <td>¥${cost}</td>
            <td id="stats">${strength}</td>
            <td id="stats">${magic}</td>
            <td id="stats">${endurance}</td>
            <td id="stats">${agility}</td>
            <td id="stats">${luck}</td>
            <td id="resistance" style="color:${physicalColour}</td>
            <td id="resistance" style="color:${gunColour}</td>
            <td id="resistance" style="color:${fireColour}</td>
            <td id="resistance" style="color:${iceColour}</td>
            <td id="resistance" style="color:${electricColour}</td>
            <td id="resistance" style="color:${windColour}</td>
            <td id="resistance" style="color:${psychicColour}</td>
            <td id="resistance" style="color:${nuclearColour}</td>
            <td id="resistance" style="color:${blessColour}</td>
            <td id="resistance" style="color:${curseColour}</td>
        `

        list.appendChild(row)
    }

    static resColour(res_type){
        let res_name_return = 'black;">-'
        if (res_type == 'wk'){
            res_name_return = `red;">${res_type}`
        } else if (res_type === 'ab'){
            res_name_return = `orange;">${res_type}`
        } else if (res_type === 'rs'){
            res_name_return = `blue;">${res_type}`
        } else if (res_type === 'nu'){
            res_name_return = `grey;">${res_type}`
        } else if (res_type === 'rp'){
            res_name_return = `black;">${res_type}`
        }
        return res_name_return
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

    static collapseInfo() {
        let div = document.getElementById("arcarna-table");
        if (div.style.display == "none") {
            div.style.display = "block";
            setTimeout(() => {
                div.style.opacity = 1;
                div.style.transition = "opacity 1s ease-in-out";
            }, 2)
            document.getElementById('arcarna-display-+').innerHTML = '-'
        } else  {
            div.style.display = "none";
            setTimeout(() => {
                div.style.opacity = 0;
                div.style.transition = "opacity 1s ease-in-out";
            }, 2)
            document.getElementById('arcarna-display-+').innerHTML = '+'
        }
    }

    static collapseTableInfo(resistance) {
        const elementsList = document.querySelectorAll(`#${resistance}`);
        const elementsArray = [...elementsList];

        elementsArray.forEach(element => {
            if (element.style.display == "none") {
                element.style.display = "";
                element.style.opacity = 1;
                document.getElementById(`${resistance}-display-+`).innerHTML = '-'
            } else  {
                element.style.display = "none";
                element.style.opacity = 0;
                document.getElementById(`${resistance}-display-+`).innerHTML = '+'
            }
        });
    }
}


// Event: On website load, loads the JSON file and populates the table
document.addEventListener('DOMContentLoaded', PersonaUI.loadPersona)

// Events: Search bar
document.getElementById('search-bar').addEventListener('keyup', () => {
    PersonaUI.tableFilter()
})

// Events: Arcarana hide
document.getElementById('arcarna-display').addEventListener('click', () => {
    PersonaUI.collapseInfo()
})

// Events: Reistance table hide
document.getElementById('resistance-display').addEventListener('click', () => {
    PersonaUI.collapseTableInfo("resistance")
})

// Events: Stats table hide
document.getElementById('stats-display').addEventListener('click', () => {
    PersonaUI.collapseTableInfo("stats")
})


