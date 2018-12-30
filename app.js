import { info } from './config.js';

class PersonaUI{

    // the init load which gathers data from the JSON file
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
        // hides some table data by default
        PersonaUI.loadHiddenTable()
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

        // changes the colour of resistance to have a better style depending on what its init value is
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

        // populats the html row
        row.innerHTML = `
            <td>${name}</td>
            <td>${arcana}</td>
            <td>${level}</td>
            <td>${cost}</td>
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
        // adds the table row data to the table
        list.appendChild(row)
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
    }

    // hides the table elements on load to make ui look cleaner
    static loadHiddenTable(){
        const elementsListRes = document.querySelectorAll('#resistance');
        const elementsArrayRes = [...elementsListRes];        
        const elementsListStats = document.querySelectorAll('#stats');
        const elementsArrayStats = [...elementsListStats];

        elementsArrayRes.forEach(element => {element.style.display = "none"})
        elementsArrayStats.forEach(element => {element.style.display = "none"})
    }

    static resetDisplay(){
        document.getElementById("persona-list").innerHTML=""
        document.getElementById("search-bar").value=""
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


