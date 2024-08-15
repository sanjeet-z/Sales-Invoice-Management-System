import { getItemFromLocalStorage } from "./utilities.js";


function validateCustomerName(customerName){


    if(customerName.value !== 'Enter the Name'){
        customerName.classList.remove('is-invalid');
        customerName.classList.add('is-valid');
        if(document.querySelector('.customerNameError')){
            document.querySelector('.customerNameError').remove();
        }
        return true;

    }else{
        customerName.classList.add('is-invalid');
        customerName.classList.remove('is-valid');

        if(!document.querySelector('.customerNameError')){
            const smallTag = document.createElement("small");
            smallTag.classList.add("text-danger", "customerNameError");
            smallTag.innerHTML = "Customer Name is required!";
            customerName.parentElement.append(smallTag);
        }

        return false;
    }
}


function validateSaleDate(date){

    const myDate = new Date(date.value);
    
    const currentDate = new Date();
    const difference = dateDiffInDays(myDate, currentDate);

    const smallTag = document.createElement("small");
    smallTag.classList.add("text-danger", "dateError");

    if(date.value === ''){
        date.classList.remove("is-valid");
        date.classList.add("is-invalid");
        if(!document.querySelector('.dateError')){
            date.parentElement.append(smallTag);
        }
        document.querySelector('.dateError').innerHTML = "Sale Date is required!";

        return false;

    }else if(difference >= 0){
        date.classList.remove('is-invalid');
        date.classList.add('is-valid');
        if(document.querySelector('.dateError')){
            document.querySelector('.dateError').remove();
        }

        return true;
    }else{
        date.classList.remove("is-valid");
        date.classList.add("is-invalid");
        if(!document.querySelector('.dateError')){
            date.parentElement.append(smallTag);
        }
        document.querySelector('.dateError').innerHTML = "Future date is not allowed!";
        return false;
    }
}


function validateProductsName(productsName){

    const storedData = getItemFromLocalStorage('invoicesData');

    const smallTag = document.createElement("small");
    smallTag.classList.add("text-danger", "productNameError");
    productsName.value = productsName.value.trim();

    if(productsName.value === ''){
        productsName.classList.remove("is-valid");
        productsName.classList.add("is-invalid");
        if(!document.querySelector('.productNameError')){
            productsName.parentElement.append(smallTag);
        }
        document.querySelector('.productNameError').innerHTML = "Name is required!";

        return false;

    }
    
    // else if(productsName.value !== uniqueOne && currentIndex && 
    //          storedData[currentIndex].productsName && 
    //          storedData[currentIndex].productsName.find((val, ind)=>val === productsName.value)){

         
    //             productsName.classList.remove("is-valid");
    //             productsName.classList.add("is-invalid");
    //             if(!document.querySelector('.titleError')){
    //                 productsName.parentElement.append(smallTag);
    //             }
    //             document.querySelector('.titleError').innerHTML = "Name should be unique!";
        
    //             return false;      

    // }
    
    else if(productsName.value.length >= 3 && productsName.value.length <= 30){
        productsName.classList.remove('is-invalid');
        productsName.classList.add('is-valid');
        if(document.querySelector('.productNameError')){
            document.querySelector('.productNameError').remove();
        }

        return true;
    }else{
        productsName.classList.remove("is-valid");
        productsName.classList.add("is-invalid");
        if(!document.querySelector('.productNameError')){
            productsName.parentElement.append(smallTag);
        }
        document.querySelector('.productNameError').innerHTML = "Name length should be between 3-30";
        return false;
    }

}

function validateProductsQuantity(productsQuantity){

    const smallTag = document.createElement("small");
    smallTag.classList.add("text-danger", "productQuantityError");

    if(productsQuantity.value === ''){
        productsQuantity.classList.remove("is-valid");
        productsQuantity.classList.add("is-invalid");
        if(!document.querySelector('.productQuantityError')){
            productsQuantity.parentElement.append(smallTag);
        }
        document.querySelector('.productQuantityError').innerHTML = "Quantity is required!";

        return false;

    }else if(productsQuantity.value >= 1){
        productsQuantity.classList.remove('is-invalid');
        productsQuantity.classList.add('is-valid');
        if(document.querySelector('.productQuantityError')){
            document.querySelector('.productQuantityError').remove();
        }

        return true;
    }else{
        productsQuantity.classList.remove("is-valid");
        productsQuantity.classList.add("is-invalid");
        if(!document.querySelector('.productQuantityError')){
            productsQuantity.parentElement.append(smallTag);
        }
        document.querySelector('.productQuantityError').innerHTML = "Quantity should be atleast one";
        return false;
    }

}

function validateProductsPrice(productsPrice){

    const smallTag = document.createElement("small");
    smallTag.classList.add("text-danger", "productPriceError");

    if(productsPrice.value === ''){
        productsPrice.classList.remove("is-valid");
        productsPrice.classList.add("is-invalid");
        if(!document.querySelector('.productPriceError')){
            productsPrice.parentElement.append(smallTag);
        }
        document.querySelector('.productPriceError').innerHTML = "Price is required!";

        return false;

    }else if(productsPrice.value >= 1){
        productsPrice.classList.remove('is-invalid');
        productsPrice.classList.add('is-valid');
        if(document.querySelector('.productPriceError')){
            document.querySelector('.productPriceError').remove();
        }

        return true;
    }else{
        productsPrice.classList.remove("is-valid");
        productsPrice.classList.add("is-invalid");
        if(!document.querySelector('.productPriceError')){
            productsPrice.parentElement.append(smallTag);
        }
        document.querySelector('.productPriceError').innerHTML = "Price should be >= 1";
        return false;
    }

}

function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

export{validateCustomerName, validateSaleDate, validateProductsName, validateProductsQuantity, validateProductsPrice}