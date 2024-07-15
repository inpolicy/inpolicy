//<!-- Add this script tag to include html2canvas -->

function takeScreenshot() {
    // Get the customer table element
    const table = document.getElementById('customer');

    // Set up the options for html2canvas
    const options = {
        scale: 5, // Increase the scale for better quality
    };

    // Use html2canvas to capture the table as an image
    html2canvas(table, options).then(function (canvas) {

        // Create a new canvas with white space and a title
        const newCanvas = document.createElement('canvas');
        const context = newCanvas.getContext('2d');
   
        // Set the new canvas size including white space and title
        const whiteSpace = 150; // Adjust this value for the desired white space
        const titleHeight = 200; // Adjust this value for the title height
        newCanvas.width = canvas.width + 2 * whiteSpace;
        newCanvas.height = canvas.height + 2 * whiteSpace + titleHeight;

        // Draw the white background
        context.fillStyle = 'white';
        context.fillRect(0, 0, newCanvas.width, newCanvas.height);

        // Draw the title with the current date in the center
        context.font = '80px Verdana'; // Adjust the font size and style
        context.fillStyle = 'black'; // Adjust the text color
        context.textAlign = 'center'; // Center the text
        context.fillText('Customer Policy Report -- ' + getCurrentDate(), newCanvas.width / 2, titleHeight - 10);

        // Draw the original screenshot onto the new canvas with white space
        context.drawImage(canvas, whiteSpace, titleHeight + whiteSpace);

        // Convert the new canvas to a data URL
        //This method converts the contents of the new canvas into base64 encoded data URL Representing the image in PNG format
        const dataUrl = newCanvas.toDataURL();

        // Create a link element to download the screenshot
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'Report.png';

        // Trigger a click event on the link to start the download
        link.click();
    });
}

// Function to get the current date in the format YYYY-MM-DD
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return day + '-' + month + '-' + year;
}

function entry() {
    var date = document.getElementById("date").value;
    var insuredName = document.getElementById("insuredName").value;
    var policyNumber = document.getElementById("policyNumber").value;
    var type = document.getElementById("type").value;
    var regNo = document.getElementById("regNo").value;
    var od = document.getElementById("od").value;
    var tpPre = document.getElementById("tpPre").value;
    var tPre = document.getElementById("tPre").value;
    var commPercent = document.getElementById("commPercent").value;
    var paymentTo = document.getElementById("paymentTo").value;
    var company = document.getElementById("company").value;

    insuredName = insuredName.toUpperCase();
    policyNumber = policyNumber.toUpperCase();
    type = type.toUpperCase();
    regNo = regNo.toUpperCase();
    od = od.toUpperCase();
    tpPre = tpPre.toUpperCase();
    tPre = tPre.toUpperCase();
    commPercent = commPercent.toUpperCase();
    paymentTo = paymentTo.toUpperCase();
    company = company.toUpperCase();

    // Get the table body element
    var tableBody = document.getElementById("tableBody");

    // Create a new row for the table
    var newRow = tableBody.insertRow(tableBody.rows.length);

    var sNoCell = newRow.insertCell(0);
    sNoCell.innerHTML = tableBody.rows.length; // Serial number is the row index

    var dateCell = newRow.insertCell(1);
    dateCell.innerHTML = date;

    var insuredNameCell = newRow.insertCell(2);
    insuredNameCell.innerHTML = insuredName;

    var policyNumberCell = newRow.insertCell(3);
    policyNumberCell.innerHTML = policyNumber;

    var typeCell = newRow.insertCell(4);
    typeCell.innerHTML = type;

    var regNoCell = newRow.insertCell(5);
    regNoCell.innerHTML = regNo;

    var odCell = newRow.insertCell(6);
    odCell.innerHTML = od;

    var tpPreCell = newRow.insertCell(7);
    tpPreCell.innerHTML = tpPre;

    // Calculate NET
    var net = parseFloat(od) + parseFloat(tpPre);
    var netCell = newRow.insertCell(8);
    netCell.innerHTML = net.toFixed(2);

    var tPreCell = newRow.insertCell(9);
    tPreCell.innerHTML = tPre;

    var commPercentCell = newRow.insertCell(10);
    commPercentCell.innerHTML = commPercent;

    // Calculate Commision 
    //formula --> (Comm % / 100)* Net amount.
    var comm = (parseFloat(commPercent) / 100) * net;
    var commCell = newRow.insertCell(11);
    commCell.innerHTML = comm.toFixed(2);

    var paymentToCell = newRow.insertCell(12);
    paymentToCell.innerHTML = paymentTo;

    var companyCell = newRow.insertCell(13);
    companyCell.innerHTML = company;

    // Clear the form
    document.getElementById("myForm").reset();
}
