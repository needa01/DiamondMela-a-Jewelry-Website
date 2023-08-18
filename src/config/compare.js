var localstorage_name = 'compareproductID';

export function getCompareProducts() {  
    return JSON.parse(localStorage.getItem(localstorage_name))
}

export function setCompareProducts(id) {
    var list = getCompareProducts();
    if (list === undefined || list === null ) {
        list = [];
    }
    list.push(id);
    localStorage.setItem(localstorage_name, JSON.stringify(list));
}   
export function removeCompareProducts(id){
    var list =[];
    list= getCompareProducts();

    if (list === undefined || list === null) list = [];
    
    if(list.includes(id)){
        list=list.filter(element=>element!==id);
    }
    
    localStorage.setItem(localstorage_name,JSON.stringify(list));  
}