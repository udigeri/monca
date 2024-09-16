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
        requestTicket.txn_total = "7.00";
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
function initializeMonerisCheckout(ticketNumber) {
    // Check if the Moneris script is loaded
    if (typeof monerisCheckout !== "undefined") {
        console.log("Moneris Checkout script loaded");

        // Instantiate the monerisCheckout object
        var myCheckout = new monerisCheckout();

        // Set the environment mode: "qa" for testing or "production" for live transactions
        myCheckout.setMode("qa");

        // Specify the div where the checkout form will be rendered
        myCheckout.setCheckoutDiv("monerisCheckout");

        // Set up the necessary callbacks
        myCheckout.setCallback("page_loaded", myPageLoad);
        myCheckout.setCallback("cancel_transaction", myCancelTransaction);
        //myCheckout.setCallback("payment_receipt", myPaymentReceipt);
        myCheckout.setCallback("payment_complete", myPaymentComplete);
        myCheckout.setCallback("error_event", myErrorEvent);
        // myCheckout.setCallback("payment_submit", myPaymentSubmit);
        // myCheckout.setCallback("remove_back_button", myRemoveBackButton);
        myCheckout.setCallback("page_closed", myPageClosed);
        myCheckout.setCallback("payment_submitted", myPaymentSubmitted);
        myCheckout.setCallback("validation_event", myValidationEvent);

        // Define callback functions
        function myPageLoad() {
            console.log("Checkout page loaded.");
        }

        function myCancelTransaction(response) {
            console.log("Transaction was cancelled:", response);
            parseResponse(response);
            response = JSON.parse(response);
            document.getElementById("rsp").innerHTML += "<p>" + JSON.stringify(response) + "</p><hr>";

            ticketNumber = response.ticket;
            myCheckout.closeCheckout(ticketNumber)

            setTimeout(myRedirect, 1000);
            //window.location.replace("http://127.0.0.1:5500/src/main/webapp/index.html?tck=" + ticketNumber);
        }

        function myRedirect() {
            console.log("Redirect");
            window.location.replace("http://127.0.0.1:5500/src/main/webapp/index.html?tck=" + ticketNumber);
        }

        function myPaymentReceipt(response) {
            console.log("Payment receipt:", response);
            parseResponse(response);
            response = JSON.parse(response);
            document.getElementById("rsp").innerHTML += "<p>" + JSON.stringify(response) + "</p><hr>";

            ticketNumber = response.ticket;
            setTimeout(myReceiptViewed, 5000);
        }

        function myReceiptViewed() {
            console.log("ReceiptViewed");
            myCheckout.closeCheckout(ticketNumber)
            window.location.replace("http://127.0.0.1:5500/src/main/webapp/index.html?tck=" + ticketNumber);
        }

        function myPaymentComplete(response) {
            console.log("Payment complete.");
            parseResponse(response);
            response = JSON.parse(response);
            document.getElementById("rsp").innerHTML += "<p>" + JSON.stringify(response) + "</p><hr>";
            setTimeout(myReceiptViewed, 1000);
        }

        function myErrorEvent(response) {
            console.log("Error event.");
            parseResponse(response);
            response = JSON.parse(response);
            document.getElementById("rsp").innerHTML += "<p>" + JSON.stringify(response) + "</p><hr>";
        }

        function myPaymentSubmit(response) {
            console.log("Payment submit.");
        }

        function myRemoveBackButton() {
            console.log("Remove Back Button.");
        }

        function myPageClosed(response) {
            console.log("The page closed.");
            parseResponse(response);
            response = JSON.parse(response);
            document.getElementById("rsp").innerHTML += "<p>" + JSON.stringify(response) + "</p><hr>";
            myCheckout.closeCheckout(ticketNumber)
            //window.location.replace("http://127.0.0.1:5500/src/main/webapp/index.html?tck=" + ticketNumber);
        }

        function myPaymentSubmitted(response) {
            console.log("The payment Submitted");
            parseResponse(response);
            response = JSON.parse(response);
            document.getElementById("rsp").innerHTML += "<p>" + JSON.stringify(response) + "</p><hr>";
        }

        function myValidationEvent() {
            console.log("Validation Event");
            parseResponse(response);
            response = JSON.parse(response);
            document.getElementById("rsp").innerHTML += "<p>" + JSON.stringify(response) + "</p><hr>";
        }


        // Initialize the checkout with the provided ticket number
        myCheckout.startCheckout(ticketNumber);
    } else {
        console.error("Moneris Checkout script not loaded");
    }
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

