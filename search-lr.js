async function searchLR() {

    const lrNo =
        document.getElementById("searchLRNo").value;

    const response =
        await fetch(
            "YOUR_WEBAPP_URL?action=searchLR&lrNo=" +
            encodeURIComponent(lrNo)
        );

    const data =
        await response.json();

    const result =
        document.getElementById("result");

    if (data.status === "notfound") {

        result.innerHTML =
            "<h3>LR Not Found</h3>";

        return;
    }

    result.innerHTML = `

        <h3>LR Found</h3>

        <p><b>LR No:</b> ${data["LR No"]}</p>

        <p><b>Date:</b> ${data["Date"]}</p>

        <p><b>From:</b> ${data["From Branch"]}</p>

        <p><b>To:</b> ${data["To Branch"]}</p>

        <p><b>Consignor:</b> ${data["Consignor"]}</p>

        <p><b>Consignee:</b> ${data["Consignee"]}</p>

        <p><b>Qty:</b> ${data["Qty"]}</p>

        <p><b>Article:</b> ${data["Article"]}</p>

        <p><b>Total:</b> ₹${data["Total"]}</p>

        <button onclick='reprintLR(${JSON.stringify(data)})'>
            Reprint LR
        </button>
    `;
}

function reprintLR(data) {

    localStorage.setItem(
        "lrData",
        JSON.stringify(data)
    );

    window.open(
        "lr-template.html",
        "_blank"
    );
}