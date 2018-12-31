import { info } from './config.js';

class PersonaUI{

    // the init load which gathers data from the JSON file
    static loadPersona() {
        let tableNameArray = []
        for (let item in info["persona"]) {
            for (let persona in info["persona"][item]){
                tableNameArray.push(persona)
                let name = persona
                let arcana = item
                let level = info["persona"][item][persona]["data"]["level"]
                let cost = info["persona"][item][persona]["base_cost"]

                let physical = PersonaUI.resColour(info["persona"][arcana][persona]["data"]["resistance"]["physical"])
                let gun = PersonaUI.resColour(info["persona"][arcana][persona]["data"]["resistance"]["gun"])
                let fire = PersonaUI.resColour(info["persona"][arcana][persona]["data"]["resistance"]["fire"])
                let ice = PersonaUI.resColour(info["persona"][arcana][persona]["data"]["resistance"]["ice"])
                let electric = PersonaUI.resColour(info["persona"][arcana][persona]["data"]["resistance"]["electric"])
                let wind = PersonaUI.resColour(info["persona"][arcana][persona]["data"]["resistance"]["wind"])
                let psychic = PersonaUI.resColour(info["persona"][arcana][persona]["data"]["resistance"]["nuclear"])
                let nuclear = PersonaUI.resColour(info["persona"][arcana][persona]["data"]["resistance"]["nuclear"])
                let bless = PersonaUI.resColour(info["persona"][arcana][persona]["data"]["resistance"]["bless"])
                let curse = PersonaUI.resColour(info["persona"][arcana][persona]["data"]["resistance"]["curse"])

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
        // hides some table data by default
        PersonaUI.loadHiddenTable()

        // Sets ids to table elements
        // loops over the list and assigns and event listern to each id name
        tableNameArray.forEach(element => {
            document.getElementById(element).addEventListener('click', (event) => {
                PersonaUI.createPersonaInfo(element, event)   
            }
        )})
    }

    // populates the table with the JSON data
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

        // removes currency with a 0 at the start to make the table look nicer
        while(cost.charAt(0) === '0'){
            cost = cost.substr(1)
        }

        // populats the html row
        row.innerHTML = `
            <td id="${name}" class="personaNameTable">${name}</td>
            <td id="${arcana}">${arcana}</td>
            <td>${level}</td>
            <td>${cost}</td>
            <td id="stats">${strength}</td>
            <td id="stats">${magic}</td>
            <td id="stats">${endurance}</td>
            <td id="stats">${agility}</td>
            <td id="stats">${luck}</td>
            <td id="resistance" style="color:${physical}</td>
            <td id="resistance" style="color:${gun}</td>
            <td id="resistance" style="color:${fire}</td>
            <td id="resistance" style="color:${ice}</td>
            <td id="resistance" style="color:${electric}</td>
            <td id="resistance" style="color:${wind}</td>
            <td id="resistance" style="color:${psychic}</td>
            <td id="resistance" style="color:${nuclear}</td>
            <td id="resistance" style="color:${bless}</td>
            <td id="resistance" style="color:${curse}</td>
        `
        // adds the table row data to the table
        list.appendChild(row)
    }

    static createPersonaInfo(personaName, event){
        const personaTableInfo = document.getElementById('create-persona-info')
        personaTableInfo.innerHTML = ""

        // passes in data from event click
        let persona = personaName
        let arcana = event.currentTarget.parentElement.children[1].id

        let strength = info["persona"][arcana][persona]["data"]["stats"]["strength"]
        let magic = info["persona"][arcana][persona]["data"]["stats"]["magic"]
        let endurance = info["persona"][arcana][persona]["data"]["stats"]["endurance"]
        let agility = info["persona"][arcana][persona]["data"]["stats"]["agility"]
        let luck = info["persona"][arcana][persona]["data"]["stats"]["luck"]

        let physical = PersonaUI.resColour(info["persona"][arcana][persona]["data"]["resistance"]["physical"])
        let gun = PersonaUI.resColour(info["persona"][arcana][persona]["data"]["resistance"]["gun"])
        let fire = PersonaUI.resColour(info["persona"][arcana][persona]["data"]["resistance"]["fire"])
        let ice = PersonaUI.resColour(info["persona"][arcana][persona]["data"]["resistance"]["ice"])
        let electric = PersonaUI.resColour(info["persona"][arcana][persona]["data"]["resistance"]["electric"])
        let wind = PersonaUI.resColour(info["persona"][arcana][persona]["data"]["resistance"]["wind"])
        let psychic = PersonaUI.resColour(info["persona"][arcana][persona]["data"]["resistance"]["nuclear"])
        let nuclear = PersonaUI.resColour(info["persona"][arcana][persona]["data"]["resistance"]["nuclear"])
        let bless = PersonaUI.resColour(info["persona"][arcana][persona]["data"]["resistance"]["bless"])
        let curse = PersonaUI.resColour(info["persona"][arcana][persona]["data"]["resistance"]["curse"])

        // create the div
        const div = document.createElement('div')
        div.className = 'create-persona-info'

        // Title
        const header = document.createElement('h3')
        header.className = "display-6 text-center"
        header.innerHTML = `<hr />
                            Name: <span class="text-primary">${persona}</span>, 
                            Confidant: <span class="text-primary">${arcana}</span>
                            `
        div.appendChild(header)


        // Stats table
        const statsTable = document.createElement('table')
        statsTable.className = 'table-persona-info table table-striped mt-5'
        statsTable.innerHTML = `
            <thead>
                <th>Strength</th>
                <th>Magic</th>
                <th>Endurance</th>
                <th>Agility</th>
                <th>Luck</th>
            </thead>
        `
        const statsRow = document.createElement('tr')
        statsRow.innerHTML =
           ` 
            <td id="personal-stats">${strength}</td>
            <td id="personal-stats">${magic}</td>
            <td id="personal-stats">${endurance}</td>
            <td id="personal-stats">${agility}</td>
            <td id="personal-stats">${luck}</td>
            `
        statsTable.appendChild(statsRow)
        div.appendChild(statsTable)


        // Resistance table
        const resistanceTable = document.createElement('table')
        resistanceTable.className = 'table-persona-info table table-striped mt-5'
        resistanceTable.innerHTML = `
            <thead>
                    <th id="personal-resistance"><img src="img/Slash.png" alt="physical" height="18"></th>
                    <th id="personal-resistance"><img src="img/Gun.png" alt="gun" height="18"></th>
                    <th id="personal-resistance"><img src="img/Fire.png" alt="fire" height="18"></th>
                    <th id="personal-resistance"><img src="img/Ice.png" alt="ice" height="18"></th>
                    <th id="personal-resistance"><img src="img/Electric.png" alt="electric" height="18"></th>
                    <th id="personal-resistance"><img src="img/Wind.png" alt="wind" height="18"></th>
                    <th id="personal-resistance"><img src="img/Psychic.png" alt="psychic" height="18"></th>
                    <th id="personal-resistance"><img src="img/Nuclear.png" alt="nuclear" height="18"></th>
                    <th id="personal-resistance"><img src="img/Light.png" alt="bless" height="18"></th>
                    <th id="personal-resistance"><img src="img/Dark.png" alt="curse" height="18"></th>
            </thead>
        `
        const resistanceRow = document.createElement('tr')
        resistanceRow.innerHTML =`
            <td id="personal-resistance" style="color:${physical}</td>
            <td id="personal-resistance" style="color:${gun}</td>
            <td id="personal-resistance" style="color:${fire}</td>
            <td id="personal-resistance" style="color:${ice}</td>
            <td id="personal-resistance" style="color:${electric}</td>
            <td id="personal-resistance" style="color:${wind}</td>
            <td id="personal-resistance" style="color:${psychic}</td>
            <td id="personal-resistance" style="color:${nuclear}</td>
            <td id="personal-resistance" style="color:${bless}</td>
            <td id="personal-resistance" style="color:${curse}</td>

            `
        resistanceTable.appendChild(resistanceRow)
        div.appendChild(resistanceTable)


        // Fusion table
        const fusionTable = document.createElement('table')
        fusionTable.className = 'table-persona-info table table-striped mt-5'
        // add the data 
        fusionTable.innerHTML = `
            <thead>
                <th>Cost</th>
                <th>Fusion 1</th>
                <th>Fusion 2</th>
            </thead>
        `
       /* // need to loop over the dict to display all fusions
        const fusionRow = document.createElement('tr')
        fusionsArray = info["persona"][arcana][persona]["fusion"]
        fusionsArray.forEach(
            fusionRow.innerHTML`
            <td>${fusion1}</td>
            <td>${fusion2}</td>
            `
            )
        fusionTable.appendChild(fusionRow)     */ 



        div.appendChild(fusionTable)

        // add the div to the table
        personaTableInfo.append(div)
    }

    // sets the colour of reistances depening on its init value
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
    
    // filters the table depending on if a button was pressed or if the table was searched
    static tableFilter(row, event) {
        let inputType = "search-bar" 
        let input, filter, table, tr, td, i
        table = document.getElementById("persona-list")
        tr = table.getElementsByTagName("tr")

        // checks for filter type
        // default is search bar but if it isnt it will search by button ID


        if (event != "search-bar"){
            inputType = event.currentTarget.id
            filter = inputType.toUpperCase()
            document.getElementById("search-bar").value=""
        } else {
            input = document.getElementById(inputType)
            filter = input.value.toUpperCase()    
        }

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[row]
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = ""
                } else {
                    tr[i].style.display = "none"
                }
            } 
        }
        document.getElementById("create-persona-info").innerHTML = ""
    }

    // collapses the arcana button display area if the user clicks the button
    static collapseInfo() {
        let div = document.getElementById("arcana-table");
        if (div.style.display == "none") {
            div.style.display = "block";
            setTimeout(() => {
                div.style.opacity = 1;
                div.style.transition = "opacity 1s ease-in-out";
            }, 2)
            document.getElementById('arcana-display-+').innerHTML = '-'
        } else  {
            div.style.display = "none";
            setTimeout(() => {
                div.style.opacity = 0;
                div.style.transition = "opacity 1s ease-in-out";
            }, 2)
            document.getElementById('arcana-display-+').innerHTML = '+'
        }
    }

    // Hides table inforatimation depending on what the user has seleceted
    static collapseTableInfo(resistance) {
        const elementsList = document.querySelectorAll(`#${resistance}`);
        const elementsArray = [...elementsList];

        elementsArray.forEach(element => {
            if (element.style.display == "none") {
                element.style.display = "";
                document.getElementById(`${resistance}-display-+`).innerHTML = '-'
            } else  {
                element.style.display = "none";
                document.getElementById(`${resistance}-display-+`).innerHTML = '+'
            }
        });

        // temp location
        PersonaUI.createPersonaInfo()
    }

    // hides the table elements on load to make ui look cleaner
    static loadHiddenTable(){
        const elementsListRes = document.querySelectorAll('#resistance');
        const elementsArrayRes = [...elementsListRes];        
        const elementsListStats = document.querySelectorAll('#stats');
        const elementsArrayStats = [...elementsListStats];

        document.getElementById("arcana-table").style.display= "none"

        elementsArrayRes.forEach(element => {element.style.display = "none"})
        elementsArrayStats.forEach(element => {element.style.display = "none"})
    }

    static resetDisplay(){
        document.getElementById("persona-list").innerHTML=""
        document.getElementById("search-bar").value=""
        document.getElementById('resistance-display-+').innerHTML = '+'
        document.getElementById('stats-display-+').innerHTML = '+'
        document.getElementById("create-persona-info").innerHTML = ""
        PersonaUI.loadPersona()
    }

    // sorts tables on click
    static sortTable(n) {
      var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      table = document.getElementById("persona-table");
      switching = true;
      //Set the sorting direction to ascending:
      dir = "asc"; 
      /*Make a loop that will continue until
      no switching has been done:*/
      while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
          //start by saying there should be no switching:
          shouldSwitch = false;
          /*Get the two elements you want to compare,
          one from current row and one from the next:*/
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
          /*check if the two rows should switch place,
          based on the direction, asc or desc:*/
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch= true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /*If a switch has been marked, make the switch
          and mark that a switch has been done:*/
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          //Each time a switch is done, increase this count by 1:
          switchcount ++;      
        } else {
          /*If no switching has been done AND the direction is "asc",
          set the direction to "desc" and run the while loop again.*/
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    }

    static sortTableCurrency(n) {
      var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      table = document.getElementById("persona-table");
      switching = true;
      //Set the sorting direction to ascending:
      dir = "asc"; 
      /*Make a loop that will continue until
      no switching has been done:*/
      while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
          //start by saying there should be no switching:
          shouldSwitch = false;
          /*Get the two elements you want to compare,
          one from current row and one from the next:*/
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];

          let str_x = x.innerHTML
          let array_x = str_x.split("¥")
          let currency_x = array_x.slice(-1)[0]

          let str_y = y.innerHTML
          let array_y = str_y.split("¥")
          let currency_y = array_y.slice(-1)[0]

          /*check if the two rows should switch place,
          based on the direction, asc or desc:*/
          if (dir == "asc") {
            if (parseInt(currency_x) > parseInt(currency_y)) {
              //if so, mark as a switch and break the loop:
              shouldSwitch= true;
              break;
            }
          } else if (dir == "desc") {
            if (parseInt(currency_x) < parseInt(currency_y)) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /*If a switch has been marked, make the switch
          and mark that a switch has been done:*/
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          //Each time a switch is done, increase this count by 1:
          switchcount ++;      
        } else {
          /*If no switching has been done AND the direction is "asc",
          set the direction to "desc" and run the while loop again.*/
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    }



}

// Event: On website load, loads the JSON file and populates the table
document.addEventListener('DOMContentLoaded', PersonaUI.loadPersona)

// Events: Search bar
document.getElementById('search-bar').addEventListener('keyup', () => {
    PersonaUI.tableFilter(0, "search-bar")
})

// Events: Arcana button select
let arcanaArray = [ "Chariot",
                    "Death",
                    "Devil",
                    "Emperor",
                    "Empress",
                    "Fool",
                    "Fortune",
                    "Hanged_Man",
                    "Hermit",
                    "Hierophant",
                    "Judgement",
                    "Justice",
                    "Lovers",
                    "Magician",
                    "Moon",
                    "Priestess",
                    "Star",
                    "Strength",
                    "Sun",
                    "Temperance",
                    "Tower"]

// loops over the list and assigns and event listern to each id name
arcanaArray.forEach(element => {
    document.getElementById(element).addEventListener('click', (event) => {
        PersonaUI.tableFilter(1, event)   
    }
)})

// Event: Reset display button
document.getElementById('reset-display').addEventListener('click', () => {
    PersonaUI.resetDisplay()
})
    
// Events: Arcana hide
document.getElementById('arcana-display').addEventListener('click', () => {
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

// Events: Stats table hide
document.getElementById('name').addEventListener('click', () => {
    PersonaUI.sortTable("0")
})
// Events: Stats table hide
document.getElementById('arcana').addEventListener('click', () => {
    PersonaUI.sortTable("1")
})
// Events: Stats table hide
document.getElementById('level').addEventListener('click', () => {
    PersonaUI.sortTable("2")
})
// Events: Stats table hide
document.getElementById('cost').addEventListener('click', () => {
    PersonaUI.sortTableCurrency("3")
})

