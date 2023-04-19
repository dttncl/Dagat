// CHECKOUT PAGE

// FUNCTION TO LOAD LOCAL STORAGE TO ORDER PAGE
loadToOrderPage();
function loadToOrderPage() {
    let txtSubtotal = document.querySelector(`#order-subtotal`);
    let txtServCharge = document.querySelector(`#order-servcharge`);
    let txtTotalPayable = document.querySelector(`#order-total-payable`);

    if (!arrStoredOrders || !arrStoredOrders.length) {
        console.log(`No Stored Orders`);
    } else {
        let subtotal = 0;

        arrStoredOrders.forEach(order => {
            let tbody = document.querySelector(`#order-table-body`);

            // let id = order.itemID;
            let name = order.itemName;
            let qty = order.itemQty;
            let totalPrice = order.itemPrice;
            let price = totalPrice / qty;

            // CREATE THE COLUMNS
            // add column item name
            let tr = document.createElement(`tr`);
            let td = document.createElement(`td`);
            td.textContent = name;
            tr.appendChild(td);

            // add column item price
            td = document.createElement(`td`);
            td.textContent = price;
            tr.appendChild(td);

            // add column item price
            td = document.createElement(`td`);
            td.textContent = qty;
            tr.appendChild(td);

            // add column item price
            td = document.createElement(`td`);
            td.textContent = totalPrice;
            tr.appendChild(td);

            // add the new tr to tbody
            tbody.appendChild(tr);

            subtotal += totalPrice;
        });

        txtSubtotal.textContent = subtotal;

        let servcharge = 40;
        txtServCharge.textContent = servcharge;

        txtTotalPayable.textContent = subtotal + servcharge;
    }
}


let arrCustomers = [];
let storedCustomers = localStorage.getItem(`arrCustomers`);
let arrStoredCustomers = JSON.parse(storedCustomers);


if (!arrStoredCustomers || !arrStoredCustomers.length) {
    console.log(`No Stored Customers`);
} else {
    arrCustomers = arrStoredCustomers;
}


// FUNCTION TO SUBMIT ORDER
submitOrder();
function submitOrder() {
    let orderForm = document.querySelector(`#order-form`);
    let index;

    // add submit event to order form
    orderForm.addEventListener(`submit`, () => {
        index = arrCustomers.length;

        let arrCInputs = document.querySelectorAll(`.customer-input`);
        console.log(arrCInputs);

        let customer = {};

        // build the object `customer`
        customer.cID = `DGT-${index}`;

        for (const input of arrCInputs) {
            customer[input.name] = input.value;
        }

        customer.cStatus = `Received`;
        customer.cOrder = arrStoredOrders;
        customer.cTotalPayable = arrStoredOrders.map(order => order.itemPrice).reduce((a, b) => a + b);

        // push object to array of customers
        arrCustomers.push(customer);

        // send array to local storage
        strCustomer = JSON.stringify(arrCustomers, null, 2);
        localStorage.setItem(`arrCustomers`, strCustomer);
        
        // remove arrays after order sent
        localStorage.removeItem(`arrOrders`);
        localStorage.removeItem(`arrTempOrders`);
        console.log(`Orders Successfully Submitted!`);

    });

}


