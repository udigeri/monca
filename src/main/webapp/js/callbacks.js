function myRedirect() {
    console.log("Redirect");
    window.location.replace("http://127.0.0.1:5500/src/main/webapp/index.html?tck=" + ticketNumber);
}

function myPageLoad() {
    console.log("Checkout page loaded.");
}

function myCancelTransaction(response) {
    console.log("Transaction was cancelled:", response);
    parseResponse(response);
    response = JSON.parse(response);
    document.getElementById("rsp").innerHTML += "<p>" + JSON.stringify(response) + "</p><hr>";

    const ticketNumber = response.ticket;
    finalizeMonerisCheckout(myCheckout, ticketNumber);

    setTimeout(myRedirect, 1000);
    //window.location.replace("http://127.0.0.1:5500/src/main/webapp/index.html?tck=" + ticketNumber);
}

function myPaymentReceipt(response) {
    console.log("Payment receipt:", response);
    parseResponse(response);
    response = JSON.parse(response);
    document.getElementById("rsp").innerHTML += "<p>" + JSON.stringify(response) + "</p><hr>";

    setTimeout(myReceiptViewed, 5000);
}

function myReceiptViewed() {
    console.log("ReceiptViewed");
    finalizeMonerisCheckout(myCheckout, ticketNumber);
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
    finalizeMonerisCheckout(myCheckout, ticketNumber);
    //window.location.replace("http://127.0.0.1:5500/src/main/webapp/index.html?tck=" + ticketNumber);
}

function myPaymentSubmitted(response) {
    console.log("The payment Submitted");
    parseResponse(response);
    response = JSON.parse(response);
    document.getElementById("rsp").innerHTML += "<p>" + JSON.stringify(response) + "</p><hr>";
}

function myValidationEvent(response) {
    console.log("Validation Event");
    parseResponse(response);
    response = JSON.parse(response);
    document.getElementById("rsp").innerHTML += "<p>" + JSON.stringify(response) + "</p><hr>";
}
