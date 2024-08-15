function setItemIntoLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

function getItemFromLocalStorage(key){
    return JSON.parse(localStorage.getItem(key)) ?? [];
}

export{setItemIntoLocalStorage, getItemFromLocalStorage};