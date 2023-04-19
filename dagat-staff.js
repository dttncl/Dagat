// STAFF PAGE

const cart = document.querySelector(`#order-cart`);
const cartDisplay = document.querySelector(`#collapse-cart`);

// HIDE CART
cart.style.display = `none`;
cartDisplay.style.display = `none`;

let storedCustomers = localStorage.getItem(`arrCustomers`);
let arrStoredCustomers = JSON.parse(storedCustomers);


// FUNCTION TO LOAD LOCAL STORAGE TO STAFF PAGE
loadToStaffPage();
function loadToStaffPage() {

    // reference for elements
    let txtPending = document.querySelector(`#staff-pending > .stat-info`);
    let txtCompleted = document.querySelector(`#staff-completed > .stat-info`);
    let txtPreparing = document.querySelector(`#staff-preparing > .stat-info`);
    let txtEarnings = document.querySelector(`#staff-earnings > .stat-info`);

    // calculate sum of cTotalPayable from array
    let earnings = arrStoredCustomers.map(customer => customer.cTotalPayable).reduce((a, b) => a + b);
    txtEarnings.textContent = `$` + earnings;

    // create order history table rows
    arrStoredCustomers.forEach(customer => {

        let tbody = document.querySelector(`#staff-ord-history`);
        let id = customer.cID;
        let date = customer.cDate;
        let amt = customer.cTotalPayable;
        let arrOrders = customer.cOrder;

        // create a row
        let tr = document.createElement(`tr`);

        // add mouseover and mouseout event to row to highlight hovered rows
        tr.addEventListener(`mouseover`, () => {
            tr.style.backgroundColor = `#AAD4FF`;
        });

        tr.addEventListener(`mouseout`, () => {
            tr.style.backgroundColor = `white`;
        });

        //-- 1 add column order id
        let td = document.createElement(`td`);
        td.textContent = id;
        tr.appendChild(td);


        //-- 2 add column order date
        td = document.createElement(`td`);
        td.textContent = date;
        tr.appendChild(td);


        //-- 3 add column order status
        td = document.createElement(`td`);
        let statList = document.createElement(`select`);
        const arrStatus = [`Received`, `Preparing`, `Completed`];

        // create status select list
        for (let stat in arrStatus) {
            var opt = document.createElement(`option`);
            opt.value = arrStatus[stat];
            opt.text = arrStatus[stat];
            statList.appendChild(opt);
        }

        statList.value = customer.cStatus;
        statList.className = `content-text`;

        changeStatusColor(statList.value);

        // function to add effects to status list
        function changeStatusColor(status) {

            let listStyle = statList.style;
            listStyle.height = `3rem`;
            listStyle.borderRadius = `7px`;
            listStyle.border = `none`;

            if (status === `Received`) {
                listStyle.backgroundColor = `#ce1126`;
                listStyle.color = `white`;

            } else if (status === `Preparing`) {
                listStyle.backgroundColor = `#0038a8`;
                listStyle.color = `white`;

            } else if (status === `Completed`) {
                listStyle.backgroundColor = `#fcd116`;
                listStyle.color = `black`;
            }
        }

        // calculate the no. of occurences of a status in array and display
        let pending = arrStoredCustomers.filter((cust) => cust.cStatus === `Received`).length;
        let preparing = arrStoredCustomers.filter((cust) => cust.cStatus === `Preparing`).length;
        let completed = arrStoredCustomers.filter((cust) => cust.cStatus === `Completed`).length;

        txtPending.textContent = pending;
        txtPreparing.textContent = preparing;
        txtCompleted.textContent = completed;

        // add change event to status options
        statList.addEventListener(`change`, () => {

            // take the value and save to array
            customer.cStatus = statList.value;
            strCustomer = JSON.stringify(arrStoredCustomers, null, 2);
            localStorage.setItem(`arrCustomers`, strCustomer);

            // calculate the no. of occurences of a status in array and display
            pending = arrStoredCustomers.filter((cust) => cust.cStatus === `Received`).length;
            preparing = arrStoredCustomers.filter((cust) => cust.cStatus === `Preparing`).length;
            completed = arrStoredCustomers.filter((cust) => cust.cStatus === `Completed`).length;

            txtPending.textContent = pending;
            txtPreparing.textContent = preparing;
            txtCompleted.textContent = completed;

            changeStatusColor(statList.value);

        });

        td.appendChild(statList);
        tr.appendChild(td);


        //-- 4 add column order items
        td = document.createElement(`td`);
        let viewBtn = document.createElement(`button`);
        viewBtn.textContent = `View Orders`;
        viewBtn.type = `button`;
        viewBtn.className = `main-text`;

        let btnStyle = viewBtn.style;
        btnStyle.height = `3rem`;
        btnStyle.borderRadius = `7px`;
        btnStyle.border = `none`;
        btnStyle.border = `solid 2px #0038A8`;
        btnStyle.cursor = `pointer`;
        btnStyle.width = `11rem`;


        // add click event for view orders button
        // this button will display all orders and customer info in a box
        let ordID = document.querySelector(`#ord-id`);
        let ordList = document.querySelector(`#ord-list`);

        viewBtn.addEventListener(`click`, () => {
            ordList.textContent = ``;

            displayOrdSummary();
            displayCustSummary();

            // function to display order summary
            function displayOrdSummary() {
                ordID.textContent = id;
                for (let order of arrOrders) {
                    let li = document.createElement(`li`);
                    li.textContent = `${order.itemName} x${order.itemQty}`;

                    li.style.fontWeight = `500`;
                    ordList.appendChild(li);
                }
            }

            // function to display customer summary
            function displayCustSummary() {
                let ordName = document.querySelector(`#ord-name`);
                let ordAdd = document.querySelector(`#ord-add`);
                let ordPhone = document.querySelector(`#ord-phone`);
                let ordDueDate = document.querySelector(`#ord-date`);

                ordName.textContent = `${customer.cFName} ${customer.cLName}`;
                ordAdd.textContent = customer.cAddress;
                ordPhone.textContent = customer.cPhone;
                ordDueDate.textContent = `${customer.cDate} ${customer.cTime}`;
            }

        });

        // add mouseover and mouseout event to buttons
        viewBtn.addEventListener(`mouseover`, () => {
            viewBtn.style.backgroundColor = `#225c6a`;
            viewBtn.style.color = `white`;

        });

        viewBtn.addEventListener(`mouseout`, () => {
            viewBtn.style.backgroundColor = `white`;
            viewBtn.style.color = `black`;
        });

        td.appendChild(viewBtn);
        tr.appendChild(td);


        //-- 5 add column order amount
        td = document.createElement(`td`);
        td.textContent = `$` + amt;
        tr.appendChild(td);

        // add the new tr to tbody
        tbody.appendChild(tr);

    });
}
