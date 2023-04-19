
let mobile = window.matchMedia("(max-width: 360px)");
let tablet = window.matchMedia("(min-width: 360px) and (max-width: 768px)");

// GLOBAL FUNCTIONS
// FUNCTION TO TOGGLE BURGER NAVIGATION
toggleBurgerNav();
function toggleBurgerNav() {
    let navToggled;
    const navSidebar = document.getElementById("main-nav-menu");
    const span1 = document.getElementById("burger-span1");
    const span2 = document.getElementById("burger-span2");
    const span3 = document.getElementById("burger-span3");
    const spanDiv = document.getElementById("burger-nav-div");

    // function to open navigation sidebar
    function openNav() {
        if (mobile.matches) { // If media query matches
            navSidebar.style.width = "100%";
        } else if (tablet.matches) {
            navSidebar.style.width = "50%";
        } else {
            navSidebar.style.width = "25%";
        }

        span1.style.transform = "rotate(45deg)";
        span1.style.top = "8px";
        span1.style.backgroundColor = "#fcd116";
        span1.style.transition = "0.4s cubic-bezier(.8,.5,.2,1.4)";

        span2.style.transform = "scale(0)";
        span2.style.backgroundColor = "#fcd116";
        span2.style.transition = "0.4s cubic-bezier(.8,.5,.2,1.4)";

        span3.style.transform = "rotate(-45deg)";
        span3.style.top = "8px";
        span3.style.backgroundColor = "#fcd116";
        span3.style.transition = "0.4s cubic-bezier(.8,.5,.2,1.4)";

        console.log(`Nav Sidebar Opened`);

        navToggled = false;
    }

    // function to close navigation sidebar
    function closeNav() {
        navSidebar.style.width = "0";

        span1.style.transform = "rotate(0deg)";
        span1.style.top = "0";
        span1.style.backgroundColor = "#ce1126";

        span2.style.transform = "scale(1)";
        span2.style.top = "8px";
        span2.style.backgroundColor = "#ce1126";

        span3.style.transform = "rotate(0deg)";
        span3.style.top = "16px";
        span3.style.backgroundColor = "#ce1126";

        console.log(`Nav Sidebar Closed`);

        navToggled = true;
    }

    closeNav();

    // event listener for burger nav icon
    spanDiv.addEventListener("click", toggleNav);

    // function call toggle functions
    function toggleNav() {
        if (navToggled) {
            openNav();
        } else {
            closeNav();
        }
    }
}


// FUNCTION TO CONTROL STAFF PAGE VISIBILITY
showStaffPage();
function showStaffPage() {
    let switchLink = document.querySelector(`#switch-acc`);
    let staffLink = document.querySelector(`#staff-link`);

    switchLink.addEventListener(`click`, (e) => {
        e.preventDefault();

        if (staffLink.style.display === "block") {
            staffLink.style.display = "none";
        } else {
            staffLink.style.display = "block";
        }
    });
}


// FUNCTION TO TOGGLE CART
toggleCartDisplay();
function toggleCartDisplay() {
    const cart = document.querySelector(`#order-cart`);
    const cartDisplay = document.querySelector(`#collapse-cart`);
    let cartToggled;

    // function to open cart
    function openCart() {

        if (mobile.matches) {
            cartDisplay.style.setProperty(`--cartWidth`, `100%`);
        } else if (tablet.matches) {
            cartDisplay.style.setProperty(`--cartWidth`, `100%`);
        } else {
            cartDisplay.style.setProperty(`--cartWidth`, `40%`);
        }

        cartDisplay.style.setProperty(`--cartPadding`, `10px`);
        console.log(`Cart Opened`);
        cartToggled = false;
    }

    // function to close cart
    function closeCart() {
        cartDisplay.style.setProperty(`--cartWidth`, `0`);
        cartDisplay.style.width = `0`;
        cartDisplay.style.setProperty(`--cartPadding`, `0`);
        console.log(`Cart Closed`);
        cartToggled = true;
    }

    closeCart();

    function toggleCart() {
        if (cartToggled) {
            openCart();
        } else {
            closeCart();
        }
    }

    cart.addEventListener("click", toggleCart);
}


let tbody = document.querySelector(`#cart-table > tbody`);
let totalPrice = 0;
let txtTotalPrice = document.querySelector(`#total-price`);

// array of orders
let arrOrders = [];
let storedOrders = localStorage.getItem(`arrOrders`);
let arrStoredOrders = JSON.parse(storedOrders);

// temp array
let tempOrders = localStorage.getItem(`arrTempOrders`);
let arrTempOrders = JSON.parse(tempOrders);

if (!arrStoredOrders || !arrStoredOrders.length) {
    arrStoredOrders = arrTempOrders;
}

// FUNCTION TO CREATE SELECT INPUT
function createDropdown(qtyList) {
    const arrQty = [1, 2, 3, 4, 5, 6, 7, 8];
    for (let num in arrQty) {
        var opt = document.createElement(`option`);
        opt.value = arrQty[num];
        opt.text = arrQty[num];
        qtyList.appendChild(opt);
    }
}


// FUNCTION TO MANAGE CART
function manageCart(arrMenuBtns) {

    // function to decide items to add to cart
    arrMenuBtns.forEach((btn) => {

        let indexID;

        if (arrStoredOrders != null) {
            // if there are items in order storage, find the index of menu item
            indexID = arrStoredOrders.map(item => item.itemID).indexOf(btn.value);
        } else {
            console.log(`No Stored Orders`);
            indexID = -1;
            arrStoredOrders = [];
        }

        //if (!arrStoredOrders || !arrStoredOrders.length) {
        //    console.log(`No Stored Orders`);
        //    indexID = -1;
        //    arrStoredOrders = [];
        //} else {
        //    indexID = arrStoredOrders.map(item => item.itemID).indexOf(btn.value);
        //}

        // if exists in order storage, do not create another row
        if (indexID >= 0) {
            console.log(`Already in Cart`);
        } else {
            // if not, execute function to add click event
            let counter = 0;
            arrOrders = arrStoredOrders;
            onClickMenuItem(counter, btn);
        }
    });


    // function to add click event to menu items
    function onClickMenuItem(counter, btn) {
        // add an event listener to each button
        btn.addEventListener(`click`, () => {

            // if clicked/added to cart, increase counter
            counter++;

            // prevent an already selected item to be displayed to cart
            if (counter === 1) {

                console.log(`${btn.value} added to cart`);
                // extract the item price from element text content
                let price = btn.nextElementSibling.lastElementChild.textContent.replace(/\D/g, '') * 1;
                // extract the item name from element text content
                let name = btn.nextElementSibling.firstElementChild.textContent;
                // assign an id to each order item using button value
                let id = btn.value;

                // FUNCTION TO HANDLE COLUMN CREATION
                createColumn();
                function createColumn() {

                    //-- 1 add column item name
                    let tr = document.createElement(`tr`);
                    let td = document.createElement(`td`);
                    td.textContent = name;
                    tr.appendChild(td);


                    //-- 2 add column dropdown
                    td = document.createElement(`td`);
                    let qtyList = document.createElement(`select`);

                    // call function to create dropdown
                    createDropdown(qtyList);

                    // add change event to select options
                    let new_price = 0;
                    qtyList.addEventListener(`change`, () => {
                        let qty = qtyList.value * 1;

                        // calculate new price
                        new_price = price * qty;

                        // update price on display
                        td.previousElementSibling.textContent = new_price;

                        // save the object to array
                        let item = {
                            itemID: id,
                            itemName: name,
                            itemQty: qty,
                            itemPrice: new_price
                        }

                        // if there is an existing item in the array
                        // replace that item with updated object
                        let delIndex = arrOrders.findIndex(item => item.itemID === btn.value);

                        arrOrders.splice(delIndex, 1, item);
                        calculateTotalPrice(arrOrders);
                    });

                    td.appendChild(qtyList);
                    tr.appendChild(td);


                    //-- 3 add column item price
                    td = document.createElement(`td`);
                    td.textContent = price;
                    tr.appendChild(td);


                    //-- 4 add column delete item
                    td = document.createElement(`td`);
                    let delBtn = document.createElement(`button`);
                    delBtn.textContent = `Remove`;
                    delBtn.type = `button`;

                    // add click event to delete button
                    delBtn.addEventListener(`click`, () => {
                        // remove row
                        tr.remove();
                        counter = 0;

                        // find index of item to remove
                        let delIndex = arrOrders.findIndex(item => item.itemID === id);

                        // using remove index, delete item from array
                        arrOrders.splice(delIndex, 1);

                        // calculate updated total price
                        calculateTotalPrice(arrOrders);
                    });

                    td.appendChild(delBtn);
                    tr.appendChild(td);


                    // add the new tr to tbody
                    tbody.appendChild(tr);


                    // save the updated object to array
                    let item = {
                        itemID: id,
                        itemName: name,
                        itemQty: 1,
                        itemPrice: price * 1
                    }
                    arrOrders.push(item);

                    // calculate updated total price
                    calculateTotalPrice(arrOrders);

                }

            }// end of if

        });
    }

}


// FUNCTION TO CALCULATE TOTAL PRICE
function calculateTotalPrice(arrOrders) {

    arrOrders.forEach((element) => {
        totalPrice += element.itemPrice;
    });

    //totalPrice = arrOrders.map(order => order.itemPrice).reduce((a, b) => a + b);
    txtTotalPrice.textContent = totalPrice;
    totalPrice = 0;

    strOrder = JSON.stringify(arrOrders, null, 2);
    console.log(strOrder);
    localStorage.setItem(`arrTempOrders`, strOrder);

    // send array of orders to localstorage
    onClickCheckout(strOrder);

}


// FUNCTION TO SEND ORDER TO LOCAL STORAGE
function onClickCheckout(strOrder) {

    let btnChkOut = document.querySelector(`#btn-checkout`);
    btnChkOut.addEventListener(`click`, () => {

        // send data to storage
        strOrder = JSON.stringify(arrOrders, null, 2);
        console.log(strOrder);
        localStorage.setItem(`arrOrders`, strOrder);
    });

}


// FUNCTION TO LOAD LOCAL STORAGE TO CART
loadToCart();
function loadToCart() {

    if (!arrStoredOrders || !arrStoredOrders.length) {
        console.log(`No Stored Orders`);

    } else {
        for (let order of arrStoredOrders) {

            let id = order.itemID;
            let name = order.itemName;
            let qty = order.itemQty;
            let price = order.itemPrice;

            // CREATE THE COLUMNS
            // add column item name
            let tr = document.createElement(`tr`);
            let td = document.createElement(`td`);
            td.textContent = name;
            tr.appendChild(td);

            // add column dropdown
            td = document.createElement(`td`);
            let qtyList = document.createElement(`select`);
            createDropdown(qtyList);
            qtyList.value = qty;

            qtyList.addEventListener(`change`, () => {

                let base_price = order.itemPrice / order.itemQty;

                qty = qtyList.value;
                let new_price = base_price * qty * 1;

                // update price on display
                td.previousElementSibling.textContent = new_price;

                // save the object to array
                let item = {
                    itemID: id,
                    itemName: name,
                    itemQty: qty,
                    itemPrice: new_price
                }

                // if there is an existing item in the array
                // replace that item with updated object
                let delIndex = arrStoredOrders.findIndex(item => item.itemID === order.itemID);

                arrStoredOrders.splice(delIndex, 1, item);
                calculateTotalPrice(arrStoredOrders);
            });

            td.appendChild(qtyList);
            tr.appendChild(td);

            // add column item price
            td = document.createElement(`td`);
            td.textContent = price;
            tr.appendChild(td);

            // add column remove item
            td = document.createElement(`td`);
            let delBtn = document.createElement(`button`);
            delBtn.textContent = `Remove`;
            delBtn.type = `button`;

            delBtn.addEventListener(`click`, () => {
                tr.remove();

                // on click, remove position from array
                let delIndex = arrStoredOrders.findIndex(item => item.itemID === order.itemID);
                arrStoredOrders.splice(delIndex, 1);

                calculateTotalPrice(arrStoredOrders);
            });

            td.appendChild(delBtn);
            tr.appendChild(td);

            // add the new tr to tbody
            tbody.appendChild(tr);
        }

        calculateTotalPrice(arrStoredOrders);
    }
}


// FUNCTION TO SUBSCRIBE TO NEWSLETTER
subscribe();
function subscribe() {
    let subscribeForm = document.querySelector(`#subscribe-form`);
    let subscribeInputs = subscribeForm.querySelectorAll(`input`);
    let arrSubscribers = [];

    subscribeForm.addEventListener(`submit`, () => {

        let subscriber = {}

        subscribeInputs.forEach((input) => {
            subscriber[input.name] = input.value;
        })

        arrSubscribers.push(subscriber);

        localStorage.setItem(`arrSubscribers`, JSON.stringify(arrSubscribers));

    })
}
// bnhf