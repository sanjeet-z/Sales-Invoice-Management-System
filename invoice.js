import { validateCustomerName, validateSaleDate, validateProductsName, validateProductsQuantity, validateProductsPrice } from "./validation.js";
import { setItemIntoLocalStorage, getItemFromLocalStorage } from "./utilities.js";


const customerName = document.getElementById('customerName');
const saleDate = document.getElementById('saleDate');
const formModal = document.getElementById('formModal');
const submitBtn = document.getElementById('submitBtn');
const updateBtn = document.getElementById('updateBtn');
let productsName = document.querySelectorAll('.productsName');
let productsQuantity = document.querySelectorAll('.productsQuantity');
let productsPrice = document.querySelectorAll('.productsPrice');
const addFieldBtn = document.getElementById('addFieldBtn');
const dynamicFieldsParent = document.getElementById('placeContent');
const tbody = document.getElementById('tbody');
let total = document.querySelectorAll('.productsTotal');
let currentIndex = null;



document.getElementById('showModalBtn').addEventListener('click', () => {
    formModal.classList.add('d-block');
    formModal.classList.remove('d-none');
    updateBtn.classList.add('d-none');
    updateBtn.classList.remove('d-block');
    submitBtn.classList.add('d-block');
    submitBtn.classList.remove('d-none');
    // clearAllFormField();
});

document.getElementById('formModalCloseBtn').addEventListener('click', () => {
    formModal.classList.add('d-none');
    formModal.classList.remove('d-block');
    clearAllFormField();
});


customerName.addEventListener('change', () => { validateCustomerName(customerName) });
saleDate.addEventListener('blur', () => { validateSaleDate(saleDate) });

productsName.forEach((productName, ind) => {
    productName.addEventListener('blur', () => { validateProductsName(productName) });
});

productsQuantity.forEach((quantity, ind) => {
    quantity.addEventListener('blur', () => {
        validateProductsQuantity(quantity);
        // console.log(document.querySelectorAll('.productsTotal'));
        total[ind].value = document.querySelectorAll('.productsPrice')[ind].value * quantity.value;
    });
});

productsPrice.forEach((price, ind) => {
    price.addEventListener('blur', () => {
        validateProductsPrice(price);
        total[ind].value = document.querySelectorAll('.productsQuantity')[ind].value * price.value;
    });
});


// generation of dynamic fields

addFieldBtn.addEventListener('click', () => {

    productsName = Array.from(document.querySelectorAll('.productsName'));
    const validatedName = productsName.filter((productName, ind) => {
        if (productName.classList.contains('is-valid')) return productName;
        else validateProductsName(productName);
    });

    productsQuantity = Array.from(document.querySelectorAll('.productsQuantity'));
    const validatedQuantity = productsQuantity.filter((quantity, ind) => {
        if (quantity.classList.contains('is-valid')) return quantity;
        else validateProductsQuantity(quantity);
    });


    productsPrice = Array.from(document.querySelectorAll('.productsPrice'));
    const validatedPrice = productsPrice.filter((price, ind) => {
        if (price.classList.contains('is-valid')) return price;
        else validateProductsPrice(price);
    });

    if (validatedName.length === productsName.length && validatedQuantity.length === productsQuantity.length
        && validatedPrice.length === productsPrice.length) {

        const divRow = document.createElement('div');
        divRow.classList.add('row', 'pb-3');

        const nameCol = document.createElement('div');
        nameCol.classList.add('col-3');
        //    const productLabel = document.createElement('label');
        //    productLabel.classList.add('form-label');
        nameCol.innerHTML = `<label for="productsName" class="form-label">Name
       <i class="bi bi-asterisk text-danger position-absolute" style="font-size: x-small;"></i>
       </label>`;
        const productName = document.createElement('input');
        productName.classList.add('form-control', 'productsName');
        productName.type = 'text';
        nameCol.append(productName);


        const quantityCol = document.createElement('div');
        quantityCol.classList.add('col-2');
        quantityCol.innerHTML = `<label for="" class="form-label">Qunatity
       <i class="bi bi-asterisk text-danger position-absolute" style="font-size: x-small;"></i>
       </label>`;
        const productQuantity = document.createElement('input');
        productQuantity.classList.add('form-control', 'productsQuantity');
        productQuantity.type = 'number';
        quantityCol.append(productQuantity);

        const priceCol = document.createElement('div');
        priceCol.classList.add('col-2');
        priceCol.innerHTML = `<label for="" class="form-label">Price
       <i class="bi bi-asterisk text-danger position-absolute" style="font-size: x-small;"></i>
       </label>`;
        const productPrice = document.createElement('input');
        productPrice.classList.add('form-control', 'productsPrice');
        productPrice.type = 'number';
        priceCol.append(productPrice);

        const totalCol = document.createElement('div');
        totalCol.classList.add('col-2');
        totalCol.innerHTML = `<label for="" class="form-label">Total
       <i class="bi bi-asterisk text-danger position-absolute" style="font-size: x-small;"></i>
       </label>`;
        const total = document.createElement('input');
        total.classList.add('form-control', 'productsTotal');
        total.disabled = true;
        total.value = 0;
        totalCol.append(total);

        const deleteBtnCol = document.createElement('div');
        deleteBtnCol.classList.add('col-2');
        const btn = document.createElement('button');
        btn.classList.add('btn', 'btn-sm', 'btn-danger', 'productsDeleteBtn', 'mt-4');
        btn.innerText = 'x';
        deleteBtnCol.append(btn);


        divRow.append(nameCol);
        divRow.append(quantityCol);
        divRow.append(priceCol);
        divRow.append(totalCol);
        divRow.append(deleteBtnCol);
        dynamicFieldsParent.append(divRow);
    }


    total = document.querySelectorAll('.productsTotal');

    productsName = document.querySelectorAll('.productsName');
    const index = productsName.length - 1;

    productsName.forEach((productName, ind) => {
        productName.addEventListener('blur', () => { validateProductsName(productName) });
    });

    productsQuantity = document.querySelectorAll('.productsQuantity');

    productsQuantity.forEach((quantity, ind) => {
        quantity.addEventListener('blur', () => {
            validateProductsQuantity(quantity);
            // console.log(document.querySelectorAll('.productsTotal'));
            total[ind].value = document.querySelectorAll('.productsPrice')[ind].value * quantity.value;
        });
    });


    productsPrice = document.querySelectorAll('.productsPrice');

    productsPrice.forEach((price, ind) => {
        price.addEventListener('blur', () => {
            validateProductsPrice(price);
            total[ind].value = document.querySelectorAll('.productsQuantity')[ind].value * price.value;
        });
    });

    const deleteBtns = document.querySelectorAll('.productsDeleteBtn');
    deleteBtns.forEach((deleteBtn, ind) => {
        deleteBtn.addEventListener('click', () => {
            deleteBtn.parentElement.parentElement.remove();
        });
    });

});

// generation of dynamic field

submitBtn.addEventListener('click', () => {
    const isCustomerNameValid = validateCustomerName(customerName);
    const isSaleDateValid = validateSaleDate(saleDate);

    const allProductsName = [];

    productsName = document.querySelectorAll('.productsName');
    productsName.forEach((productName, ind) => {
        if (validateProductsName(productName))
            allProductsName.push(productName.value);
    });
    // console.log(allProductsName);

    const allQuantities = [];
    productsQuantity = document.querySelectorAll('.productsQuantity');
    productsQuantity.forEach((quantity, ind) => {
        if (validateProductsQuantity(quantity))
            allQuantities.push(quantity.value);
    });
    // console.log(allQuantities)

    const allPrices = [];
    productsPrice = document.querySelectorAll('.productsPrice');
    productsPrice.forEach((price, ind) => {
        if (validateProductsPrice(price))
            allPrices.push(price.value);
    });
    // console.log(allPrices);

    const storedData = getItemFromLocalStorage('invoicesData');

    if (isCustomerNameValid && isSaleDateValid && productsName.length === allProductsName.length
        && productsQuantity.length === allQuantities.length && productsPrice.length === allPrices.length) {

        let netTotal = 0;
        allPrices.forEach((value, ind) => {
            netTotal += (value * allQuantities[ind]);
        });

        let newId = 1;
        if (storedData.length > 0) {
            newId = storedData[storedData.length - 1].id + 1;
        }

        const invoicesData = {
            id: newId,
            customerName: customerName.value,
            saleDate: saleDate.value,
            productsName: allProductsName,
            productsQuantity: allQuantities,
            productsPrice: allPrices,
            netTotal: netTotal
        };

        storedData.push(invoicesData);
        setItemIntoLocalStorage('invoicesData', storedData);
        showMainTableData();
        clearAllFormField();
        formModal.classList.add('d-none');
        formModal.classList.remove('d-block');

    }

});


// Showing invoice tabel.

function showMainTableData() {
    const storedData = getItemFromLocalStorage('invoicesData');
    tbody.innerHTML = '';

    if (storedData.length > 0) {
        // let id = storedData[storedData.length-1].id;
        // console.log(id);
        storedData.forEach((data, ind) => {
            tbody.innerHTML += `
        
            <tr>
            
                <td>${data.customerName}</td>
                <td><a href="#" class="text-black products">${data.productsName[0]}</a></td>
                <td>${data.saleDate}</td>
                <td>${data.netTotal}</td>

                <td>
                <button type="button" class="btn p-1 editBtn bi bi-pencil-fill"></button>
                <button type="button" class="btn p-1 deleteBtn bi bi-trash-fill"> </button>
                </td>
            
            </tr>
        `;
        });

        // to show products

        const products = document.querySelectorAll('.products');
        products.forEach((product, ind) => {
            product.addEventListener('click', () => {
                currentIndex = ind;
                document.getElementById('productsModal').classList.add('d-block');
                document.getElementById('productsModal').classList.remove('d-none');
                showProductDetails();
            });
        });

        document.getElementById('closeProductsModal').addEventListener('click', () => {
            document.getElementById('productsModal').classList.add('d-none');
            document.getElementById('productsModal').classList.remove('d-block');
        });

        // editBtn events

        const editBtns = document.querySelectorAll('.editBtn');
        editBtns.forEach((editBtn, ind) => {
            editBtn.addEventListener('click', () => {
                currentIndex = ind;

                formModal.classList.add('d-block');
                formModal.classList.remove('d-none');
                submitBtn.classList.remove('d-block');
                submitBtn.classList.add('d-none');
                updateBtn.classList.remove('d-none');
                updateBtn.classList.add('d-block');

                customerName.value = storedData[currentIndex].customerName;
                saleDate.value = storedData[currentIndex].saleDate;


                // valueForToggle = mainData[currentIndex].title;

                //for dynamic field.
                productsName = document.querySelectorAll('.productsName');
                productsQuantity = document.querySelectorAll('.productsQuantity');
                productsPrice = document.querySelectorAll('.productsPrice');
                total = document.querySelectorAll('.productsTotal');
                // console.log(productsName);

                // storedData[currentIndex].productsName.forEach((productName, ind) => {
                for (let ind = 0; ind < storedData[currentIndex].productsName.length; ind++) {
                    if (ind === 0) {
                        productsName[ind].value = storedData[currentIndex].productsName[ind];
                        productsQuantity[ind].value = storedData[currentIndex].productsQuantity[ind];
                        productsPrice[ind].value = storedData[currentIndex].productsPrice[ind];
                        total[ind].value = storedData[currentIndex].productsQuantity[ind] * storedData[currentIndex].productsPrice[ind];

                    } else {
                        dynamicFieldsParent.innerHTML += `
            
                        <div class="row pb-3">
                            <div class="col-3">
                                <label for="productsName" class="form-label">Name
                                    <i class="bi bi-asterisk text-danger position-absolute" style="font-size: x-small;"></i>
                                </label>
                                <input type="text" class="form-control productsName" value="${storedData[currentIndex].productsName[ind]}">
                            </div>

                            <div class="col-2">
                                <label for="" class="form-label">Qunatity
                                    <i class="bi bi-asterisk text-danger position-absolute" style="font-size: x-small;"></i>
                                </label>
                                <input type="number" class="form-control productsQuantity" value="${storedData[currentIndex].productsQuantity[ind]}">
                            </div>

                            <div class="col-2">
                                <label for="" class="form-label">Price
                                    <i class="bi bi-asterisk text-danger position-absolute" style="font-size: x-small;"></i>
                                </label>
                                <input type="number" class="form-control productsPrice" value="${storedData[currentIndex].productsPrice[ind]}">
                            </div>

                            <div class="col-2">
                                <label for="" class="form-label">Total
                                    <i class="bi bi-asterisk text-danger position-absolute" style="font-size: x-small;"></i>
                                </label>
                                <input type="number" class="form-control productsTotal" value="${storedData[currentIndex].productsPrice[ind] * storedData[currentIndex].productsQuantity[ind]}" disabled>
                            </div>

                            <div class="col-2">
                            <button class="btn btn-sm btn-danger productsDeleteBtn">x</button>
                            </div>

                        </div>
            `;
                    }
                }
                total = document.querySelectorAll('.productsTotal');
                productsQuantity = document.querySelectorAll('.productsQuantity');

                productsQuantity.forEach((quantity, ind) => {
                    quantity.addEventListener('blur', () => {
                        validateProductsQuantity(quantity);
                        // console.log(document.querySelectorAll('.productsTotal'));
                        total[ind].value = document.querySelectorAll('.productsPrice')[ind].value * quantity.value;
                    });
                });


                productsPrice = document.querySelectorAll('.productsPrice');

                productsPrice.forEach((price, ind) => {
                    price.addEventListener('blur', () => {
                        validateProductsPrice(price);
                        total[ind].value = document.querySelectorAll('.productsQuantity')[ind].value * price.value;
                    });
                });



                const deleteBtns = document.querySelectorAll('.productsDeleteBtn');
                deleteBtns.forEach((deleteBtn, ind) => {
                    deleteBtn.addEventListener('click', () => {
                        deleteBtn.parentElement.parentElement.remove();
                    });
                });

            });

        });

        // editBtn events


        // deleteBtn events

        const deleteBtns = document.querySelectorAll('.deleteBtn')
        deleteBtns.forEach((deleteBtn, ind) => {
            deleteBtn.addEventListener('click', () => {
                currentIndex = ind;
                document.getElementById('deleteConfirmModal').classList.add('d-block');
                document.getElementById('deleteConfirmModal').classList.remove('d-none');
            });
        });

        // deleteBtn events
    }
}
showMainTableData();

// Showing invoice table.


// updation of data

updateBtn.addEventListener('click', () => {
    const isCustomerNameValid = validateCustomerName(customerName);
    const isSaleDateValid = validateSaleDate(saleDate);

    const allProductsName = [];

    productsName = document.querySelectorAll('.productsName');
    productsName.forEach((productName, ind) => {
        if (validateProductsName(productName))
            allProductsName.push(productName.value);
    });
    // console.log(allProductsName);

    const allQuantities = [];
    productsQuantity = document.querySelectorAll('.productsQuantity');
    productsQuantity.forEach((quantity, ind) => {
        if (validateProductsQuantity(quantity))
            allQuantities.push(quantity.value);
    });
    // console.log(allQuantities)

    const allPrices = [];
    productsPrice = document.querySelectorAll('.productsPrice');
    productsPrice.forEach((price, ind) => {
        if (validateProductsPrice(price))
            allPrices.push(price.value);
    });
    // console.log(allPrices);

    const storedData = getItemFromLocalStorage('invoicesData');

    if (isCustomerNameValid && isSaleDateValid && productsName.length === allProductsName.length
        && productsQuantity.length === allQuantities.length && productsPrice.length === allPrices.length) {

        let netTotal = 0;
        allPrices.forEach((value, ind) => {
            netTotal += (value * allQuantities[ind]);
        });

        const invoicesData = {
            id: storedData[currentIndex].id,
            customerName: customerName.value,
            saleDate: saleDate.value,
            productsName: allProductsName,
            productsQuantity: allQuantities,
            productsPrice: allPrices,
            netTotal: netTotal
        };

        storedData[currentIndex] = invoicesData;
        setItemIntoLocalStorage('invoicesData', storedData);
        showMainTableData();
        clearAllFormField();
        formModal.classList.add('d-none');
        formModal.classList.remove('d-block');
    }

});

// updation of data



// deletion and confirmation of row

document.getElementById('confirmModalBtn').addEventListener('click', () => {
    const storedData = getItemFromLocalStorage('invoicesData');
    const saleDate = new Date(storedData[currentIndex].saleDate);
    const currentDate = new Date();
    const difference = dateDiffInDays(saleDate, currentDate);

    document.getElementById('deleteConfirmModal').classList.remove('d-block');
    document.getElementById('deleteConfirmModal').classList.add('d-none');

    if (difference <= 10) {
        storedData.splice(currentIndex, 1);
        setItemIntoLocalStorage('invoicesData', storedData);
        showMainTableData();
    } else {
        alert("This date is having more than 10 days difference. You can't delete it!");
    }

});

// to cancle deletion
document.getElementById('closeConfirmModal').addEventListener('click', () => {
    document.getElementById('deleteConfirmModal').classList.add('d-none');
    document.getElementById('deleteConfirmModal').classList.remove('d-block');
});

// deletion and confirmation of row



// clearing all form-data

function clearAllFormField() {

    customerName.value = 'Enter the Name';
    customerName.classList.remove('is-valid', 'is-invalid');
    if (document.querySelector('.customerNameError')) document.querySelector('.customerNameError').remove();

    saleDate.value = '';
    saleDate.classList.remove('is-valid', 'is-invalid');
    if (document.querySelector('.dateError')) document.querySelector('.dateError').remove();


    dynamicFieldsParent.innerHTML = '';

    document.querySelector('.productsName').value = '';
    document.querySelector('.productsName').classList.remove('is-valid', 'is-invalid');
    if (document.querySelector('.productNameError')) document.querySelector('.productNameError').remove();

    document.querySelector('.productsQuantity').value = '';
    document.querySelector('.productsQuantity').classList.remove('is-valid', 'is-invalid');
    if (document.querySelector('.productQuantityError')) document.querySelector('.productQuantityError').remove();

    document.querySelector('.productsPrice').value = '';
    document.querySelector('.productsPrice').classList.remove('is-valid', 'is-invalid');
    if (document.querySelector('.productPriceError')) document.querySelector('.productPriceError').remove();

    document.querySelector('.productsTotal').value = 0;
}

// clearing all form-data



// to show product details.

function showProductDetails() {

    const storedData = getItemFromLocalStorage('invoicesData');
    const placeHere = document.getElementById('placeProduct');
    placeHere.innerHTML = '';
    storedData[currentIndex].productsName.forEach((productName, ind) => {
        placeHere.innerHTML += `
         
            <li>${productName}</li>
         `;
    });
}

// to show product details.




// searching from table

document.getElementById("search").addEventListener('keyup', () => {
    const storedData = getItemFromLocalStorage('invoicesData');
    const search = document.getElementById("search").value.toLowerCase();

    let searchArr = storedData.filter((data, ind) => {
        if (data.customerName.toLowerCase().includes(search) || data.productsName[0].toLowerCase().includes(search)
            || data.saleDate.toLowerCase().includes(search) || (String)(data.netTotal).includes(search)) {
            return data;
        }
    });

    // console.log(searchArr1);

    // clearAllDataFromTable();

    tbody.innerHTML = '';

    if (searchArr.length > 0) {

        searchArr.forEach((data, ind) => {

            tbody.innerHTML += `
         
                    <tr>
                    
                    <td>${data.customerName}</td>
                    <td><a ID="${data.id}" href="#" class="text-black products">${data.productsName[0]}</a></td>
                    <td>${data.saleDate}</td>
                    <td>${data.netTotal}</td>
    
                    <td>
                    <button ID="${data.id}" type="button" class="btn p-1 editBtn bi bi-pencil-fill"></button>
                    <button ID="${data.id}" type="button" class="btn p-1 deleteBtn bi bi-trash-fill"> </button>
                    </td>

                    </tr>   `;

        });

    }


      // deleteBtn events

            const deleteBtns = document.querySelectorAll('.deleteBtn')
            deleteBtns.forEach((deleteBtn, ind) => {
                deleteBtn.addEventListener('click', (e) => {
                    const id = Number(e.target.getAttribute('ID'));
                    let index = -1;
                    storedData.find((data, ind) => {
                        if (data.id === id) {
                            index = ind;
                            return;
                        }
                    });
                    currentIndex = index;
                    document.getElementById('deleteConfirmModal').classList.add('d-block');
                    document.getElementById('deleteConfirmModal').classList.remove('d-none');
                });
            });

    // deleteBtn events


        const products = document.querySelectorAll('.products');
        products.forEach((product, ind) => {
            product.addEventListener('click', (e) => {
                const id = Number(e.target.getAttribute('ID'));
                let index = -1;
            storedData.find((data, ind) => {
                if (data.id === id) {
                    index = ind;
                    return;
                }
            });
                  
                
                document.getElementById('productsModal').classList.add('d-block');
                document.getElementById('productsModal').classList.remove('d-none');
                currentIndex = index;
                showProductDetails();
            });
        });

        document.getElementById('closeProductsModal').addEventListener('click', () => {
            document.getElementById('productsModal').classList.add('d-none');
            document.getElementById('productsModal').classList.remove('d-block');
        });


    document.querySelectorAll('.editBtn').forEach((btn, ind) => {
        btn.addEventListener('click', (e) => {
            const id = Number(e.target.getAttribute('ID'));
            formModal.classList.add('d-block');
            formModal.classList.remove('d-none');
            submitBtn.classList.remove('d-block');
            submitBtn.classList.add('d-none');
            updateBtn.classList.remove('d-none');
            updateBtn.classList.add('d-block');
            // console.log(typeof id);

            let index = -1;
            storedData.find((data, ind) => {
                if (data.id === id) {
                    console.log(id);
                    index = ind;
                    return;
                }
            });
            currentIndex = index;
            customerName.value = storedData[index].customerName;
            saleDate.value = storedData[index].saleDate;


            //for dynamic field.
            productsName = document.querySelectorAll('.productsName');
            productsQuantity = document.querySelectorAll('.productsQuantity');
            productsPrice = document.querySelectorAll('.productsPrice');
            total = document.querySelectorAll('.productsTotal');
            // console.log(productsName);

            // storedData[currentIndex].productsName.forEach((productName, ind) => {
            for (let ind = 0; ind < storedData[index].productsName.length; ind++) {
                if (ind === 0) {
                    productsName[ind].value = storedData[index].productsName[ind];
                    productsQuantity[ind].value = storedData[index].productsQuantity[ind];
                    productsPrice[ind].value = storedData[index].productsPrice[ind];
                    total[ind].value = storedData[index].productsQuantity[ind] * storedData[index].productsPrice[ind];

                } else {
                    dynamicFieldsParent.innerHTML += `
            
                <div class="row pb-3">
                    <div class="col-3">
                        <label for="productsName" class="form-label">Name
                            <i class=""bi bi-asterisk text-danger position-absolute" style="font-size: x-small;"></i>
                        </label>"
                        <input type="text" class="form-control productsName" value="${storedData[index].productsName[ind]}">
                    </div>

                    <div class="col-2">
                        <label for="" class="form-label">Qunatity
                            <i class="bi bi-asterisk text-danger position-absolute" style="font-size: x-small;"></i>
                        </label>
                        <input type="number" class="form-control productsQuantity" value="${storedData[index].productsQuantity[ind]}">
                    </div>

                    <div class="col-2">
                        <label for="" class="form-label">Price
                            <i class="bi bi-asterisk text-danger position-absolute" style="font-size: x-small;"></i>
                        </label>
                        <input type="number" class="form-control productsPrice" value="${storedData[index].productsPrice[ind]}">
                    </div>

                    <div class="col-2">
                        <label for="" class="form-label">Total
                            <i class="bi bi-asterisk text-danger position-absolute" style="font-size: x-small;"></i>
                        </label>
                        <input type="number" class="form-control productsTotal" value="${storedData[index].productsPrice[ind] * storedData[index].productsQuantity[ind]}" disabled>
                    </div>

                    <div class="col-2">
                    <button class="btn btn-sm btn-danger productsDeleteBtn">x</button>
                    </div>

                </div>
            `;
                }
            }

        total = document.querySelectorAll('.productsTotal');
        productsQuantity = document.querySelectorAll('.productsQuantity');

        productsQuantity.forEach((quantity, ind) => {
            quantity.addEventListener('blur', () => {
                validateProductsQuantity(quantity);
                // console.log(document.querySelectorAll('.productsTotal'));
                total[ind].value = document.querySelectorAll('.productsPrice')[ind].value * quantity.value;
            });
        });


        productsPrice = document.querySelectorAll('.productsPrice');

        productsPrice.forEach((price, ind) => {
            price.addEventListener('blur', () => {
                validateProductsPrice(price);
                total[ind].value = document.querySelectorAll('.productsQuantity')[ind].value * price.value;
            });
        });
        

            const deleteBtns = document.querySelectorAll('.productsDeleteBtn');
            deleteBtns.forEach((deleteBtn, ind) => {
                deleteBtn.addEventListener('click', () => {
                    deleteBtn.parentElement.parentElement.remove();
                });
            });

        });

    });

});

// searching from table
function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

