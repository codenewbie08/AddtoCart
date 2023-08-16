import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-3180a-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListinDB = ref (database, "shoppingList")

const addButtonEl = document.getElementById("add-button")
const inputFieldEl = document.getElementById("input-field")
const shoppingListEl = document.getElementById("shopping-list")



addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    push(shoppingListinDB, inputValue)
    clearInputFieldEl()
    
})

onValue(shoppingListinDB, function(snapshot) {
    
    
        let itemArray = Object.entries(snapshot.val())

        clearShoppingEl()
   
        for (let i = 0; i < itemArray.length; i++){
            let newArray = itemArray[i]
            let currentItemID = newArray[0]
            let currentItemValue = newArray[1]

        appendItemToShoppingListEl(newArray)
        
     }
   

    
})

function clearShoppingEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}
function appendItemToShoppingListEl(itemValue) {
    let itemShoppingID = itemValue[0]
    let itemShopppingValues = itemValue[1]
    
    let newEl = document.createElement("li")
    newEl.textContent = itemShopppingValues

    newEl.addEventListener("click", function(){

    let exactLocationOfShoppingListDB = ref (database, `shoppingList/${itemShoppingID}`)
        remove(exactLocationOfShoppingListDB)

    })

    shoppingListEl.append(newEl)
}