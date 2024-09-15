console.log("Script loaded");


const command = "Payment"
//const command = "Tokenization"



const requestTicket = {
    store_id: storeId,
    api_token: apiToken,
    checkout_id: "",
    order_no: 'cartId:' + crypto.randomUUID(),
    txn_total: '10.00',
    language: 'en',
    environment: 'qa',
    action: 'preload'
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
        requestTicket.txn_total = "8.00";
    }

    try {
        const response = await fetch("https://gatewayt.moneris.com/chktv2/request/request.php", {
            method: 'POST',
            body: JSON.stringify(requestTicket)
        });
        const data = await response.json();
        console.log(data);
        document.getElementById("ticketNumber").value = data.response.ticket;
        document.getElementById("rsp").innerHTML = "<p>" + JSON.stringify(data.response) + "</p>";
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
        document.getElementById("rsp").innerHTML = "<p>" + JSON.stringify(data) + "</p>";
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
        myCheckout.setCallback("payment_receipt", myPaymentReceipt);
        myCheckout.setCallback("payment_complete", myPaymentComplete);
        myCheckout.setCallback("error_event", myErrorEvent);
        myCheckout.setCallback("payment_submit", myPaymentSubmit);
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
            ticketNumber = response.ticket;
            myCheckout.closeCheckout(ticketNumber)

            //window.location.replace("http://127.0.0.1:5500/src/main/webapp/index.html?tck=" + ticketNumber);
        }
        function myPaymentReceipt(response) {
            console.log("Payment receipt:", response);
            parseResponse(response);
            response = JSON.parse(response);
            ticketNumber = response.ticket;
            const myTimeout = setTimeout(myReceiptViewed, 5000);
        }

        function myReceiptViewed() {
            console.log("ReceiptViewed");
            myCheckout.closeCheckout(ticketNumber)
            //window.location.replace("http://127.0.0.1:5500/src/main/webapp/index.html?tck=" + ticketNumber);
        }

        function myPaymentComplete() {
            console.log("Payment complete.");
            myCheckout.closeCheckout(ticketNumber)
        }

        function myErrorEvent() {
            console.log("Error event.");
        }

        function myPaymentSubmit(rsp) {
            console.log("Payment submit.");
            parseResponse(rsp);

        }

        function myRemoveBackButton() {
            console.log("Remove Back Button.");
        }

        function myPageClosed(rsp) {
            console.log("The page closed.");
            parseResponse(rsp);
        }

        function myPaymentSubmitted() {
            console.log("The payment Submitted");
        }

        function myValidationEvent() {
            console.log("Validation Event");
        }

        function onGooglePaymentButtonClicked() {
            console.log("onGooglePaymentButtonClicked Event");
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
    }
    for (const property in response) {
        console.log(`${property}: ${response[property]}`);
    }

    // if (response.error !== null){
    //     for (const property in response.error) {
    //         console.log(`${property}: ${response.error[property]}`);
    //     }    
    // }
}

