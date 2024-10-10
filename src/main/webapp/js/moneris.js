console.log("Script loaded");


const command = "Payment"
//const command = "Tokenization"


const requestTicket = {
    store_id: storeId,
    api_token: apiToken,
    checkout_id: "",
    txn_total: '10.00',
    environment: 'qa',
    action: 'preload',
    order_no: 'cartId:' + crypto.randomUUID(),
    cust_id: 'corrId:' + crypto.randomUUID(),
    language: 'en'
}
const requestReceipt = {
    store_id: storeId,
    api_token: apiToken,
    checkout_id: "",
    ticket: ticketNumber,
    environment: 'qa',
    action: 'receipt'
}


// Function to initialize Moneris Ticket
async function initializeMonerisTicket(data) {
    console.log("initializeMonerisTicket");

    requestTicket.checkout_id = checkoutId_Tokenization;
    requestTicket.txn_total = "0.00";
    requestTicket.order_no = 'cartId:' + crypto.randomUUID();
    document.getElementById("title").innerText = command;
    if (command === 'Payment') {
        requestTicket.checkout_id = checkoutId_Payment;
        requestTicket.txn_total = "3.00";
    }

    try {
        const response = await fetch("https://gatewayt.moneris.com/chktv2/request/request.php", {
            method: 'POST',
            body: JSON.stringify(requestTicket)
        });
        const data = await response.json();
        console.log(data);
        document.getElementById("ticketNumber").value = data.response.ticket;
        document.getElementById("rsp").innerHTML += "<p>" + JSON.stringify(data.response) + "</p><hr>";
        parseResponse(data.response);
    } catch (e) {
        console.error(e);
    }
}

// Function to initialize Moneris Receipt
async function initializeMonerisReceipt(ticketNumber) {
    console.log("initializeMonerisReceipt");
    try {
        requestReceipt.ticket = ticketNumber;
        requestReceipt.checkout_id = checkoutId_Tokenization;
        if (command === 'Payment') {
            requestReceipt.checkout_id = checkoutId_Payment;
        }

        const response = await fetch("https://gatewayt.moneris.com/chktv2/request/request.php", {
            method: 'POST',
            body: JSON.stringify(requestReceipt)
        });
        const data = await response.json();
        console.log(data);
        document.getElementById("rsp").innerHTML += "<p>" + JSON.stringify(data) + "</p><hr>";
    } catch (e) {
        console.error(e);
    }
}


// Function to initialize Moneris Checkout
function initializeMonerisCheckout(chktInst, ticketNumber) {
    if (ticketNumber) {
        if (typeof monerisCheckout !== "undefined") {
            console.log("Moneris Checkout script loaded");
    
            // Initialize the checkout with the provided ticket number
            chktInst.startCheckout(ticketNumber);
        } else {
            console.error("Moneris Checkout script not loaded");
        }
    } else {
        alert("Please enter a ticket number.");
    }
}

// Function to initialize Moneris Checkout
function finalizeMonerisCheckout(chktInst, ticketNumber) {
    chktInst.closeCheckout(ticketNumber);
}

document.getElementById("title").innerText = command;

function parseResponse(response) {
    console.log("Object Response:", response);
    // Ensure the response is an object
    if (typeof response === "string") {
        try {
            response = JSON.parse(response);
        } catch (e) {
            console.error("Failed to parse response JSON:", e);
            return;
        }

        for (const property in response) {
            console.log(`${property}: ${response[property]}`);
        }
    }
}

