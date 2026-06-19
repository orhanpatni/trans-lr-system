// ===============================
// AUTO DATE / TIME / LR NO
// ===============================

window.onload = function () {

    generateLRNo();
    setCurrentDate();
    setCurrentTime();

    bindEvents();

    calculateFreight();
    calculateTotals();
};

// ===============================
// LR NUMBER
// ===============================

function generateLRNo() {

    const randomNo =
        Math.floor(Math.random() * 900000) + 100000;

    document.getElementById("lrNo").value =
        "LR/" + randomNo;
}

// ===============================
// DATE
// ===============================

function setCurrentDate() {

    const today = new Date();

    const yyyy = today.getFullYear();

    const mm =
        String(today.getMonth() + 1)
            .padStart(2, "0");

    const dd =
        String(today.getDate())
            .padStart(2, "0");

    document.getElementById("bookingDate").value =
        `${yyyy}-${mm}-${dd}`;
}

// ===============================
// TIME
// ===============================

function setCurrentTime() {

    const now = new Date();

    const hh =
        String(now.getHours())
            .padStart(2, "0");

    const mm =
        String(now.getMinutes())
            .padStart(2, "0");

    document.getElementById("bookingTime").value =
        `${hh}:${mm}`;
}

// ===============================
// EVENTS
// ===============================

function bindEvents() {

    const ids = [

        "chargeType",

        "artQty",
        "articleRate",

        "chargedWt",
        "wtRate",

        "fixAmt",

        "freight",
        "aoc",
        "rCharge",
        "hamali",
        "doorDelivery",
        "lc",
        "lrCharge"

    ];

    ids.forEach(id => {

        const el =
            document.getElementById(id);

        if (!el) return;

        el.addEventListener(
            "input",
            () => {

                calculateFreight();
                calculateTotals();
            }
        );

        el.addEventListener(
            "change",
            () => {

                calculateFreight();
                calculateTotals();
            }
        );

    });
}

// ===============================
// ARTICLE / WEIGHT / FIX
// ===============================

function calculateFreight() {

    const chargeType =
        document.getElementById("chargeType").value;

    let freight = 0;

    // ARTICLE

    if (chargeType === "ARTICLE") {

        const qty =
            Number(
                document.getElementById("artQty").value
            ) || 0;

        const rate =
            Number(
                document.getElementById("articleRate").value
            ) || 0;

        freight = qty * rate;

        document.getElementById("artAmount").value =
            freight;
    }

    // WEIGHT

    if (chargeType === "WEIGHT") {

        const wt =
            Number(
                document.getElementById("chargedWt").value
            ) || 0;

        const rate =
            Number(
                document.getElementById("wtRate").value
            ) || 0;

        freight = wt * rate;

        document.getElementById("wtAmt").value =
            freight;
    }

    // FIX

    if (chargeType === "FIX") {

        freight =
            Number(
                document.getElementById("fixAmt").value
            ) || 0;
    }

    document.getElementById("freight").value =
        freight;
}

// ===============================
// TOTALS
// ===============================

function calculateTotals() {

    const freight =
        Number(document.getElementById("freight").value) || 0;

    const aoc =
        Number(document.getElementById("aoc").value) || 0;

    const rCharge =
        Number(document.getElementById("rCharge").value) || 0;

    const hamali =
        Number(document.getElementById("hamali").value) || 0;

    const doorDelivery =
        Number(document.getElementById("doorDelivery").value) || 0;

    const lc =
        Number(document.getElementById("lc").value) || 0;

    const lrCharge =
        Number(document.getElementById("lrCharge").value) || 0;

    const total =
        freight +
        aoc +
        rCharge +
        hamali +
        doorDelivery +
        lc +
        lrCharge;

    document.getElementById("total").value =
        total;

    document.getElementById("grandTotal").value =
        total;
}

// ===============================
// ARTICLE TABLE
// ===============================

function addArticle() {

    const qty =
        document.getElementById("artQty").value;

    const type =
        document.getElementById("articleType").value;

    const contain =
        document.getElementById("saidToContain").value;

    const amount =
        document.getElementById("artAmount").value;

    if (qty === "") {

        alert("Enter Article Qty");

        return;
    }

    const tbody =
        document.querySelector(
            "#articleTable tbody"
        );

    const row =
        tbody.insertRow();

    row.insertCell(0).innerText =
        qty;

    row.insertCell(1).innerText =
        type;

    row.insertCell(2).innerText =
        contain;

    row.insertCell(3).innerText =
        amount;

    row.insertCell(4).innerHTML =
        `<button onclick="deleteRow(this)">Delete</button>`;

    updateTotalArticles();
}

// ===============================
// DELETE ARTICLE
// ===============================

function deleteRow(button) {

    button.parentElement.parentElement.remove();

    updateTotalArticles();
}

// ===============================
// TOTAL ARTICLE COUNT
// ===============================

function updateTotalArticles() {

    const rows =
        document.querySelectorAll(
            "#articleTable tbody tr"
        );

    document.getElementById("totalArt").innerText =
        rows.length;
}

// ===============================
// PRINT LR
// ===============================

function printLR() {


const lrData = {

    fromBranch: document.getElementById("fromBranch").value,
    toBranch: document.getElementById("toBranch").value,

    lrNo: document.getElementById("lrNo").value,
    bookingDate: document.getElementById("bookingDate").value,
    bookingTime: document.getElementById("bookingTime").value,

    freightType: document.getElementById("freightType").value,

    consignorName: document.getElementById("consignorName").value,
    consigneeName: document.getElementById("consigneeName").value,

    consignorMobile: document.getElementById("consignorMobile").value,
    consigneeMobile: document.getElementById("consigneeMobile").value,

    consignorGST: document.getElementById("consignorGST").value,
    consigneeGST: document.getElementById("consigneeGST").value,

    artQty: document.getElementById("artQty").value,
    articleType: document.getElementById("articleType").value,

    invoiceNo: document.getElementById("invoiceNo").value,
    declaredValue: document.getElementById("declaredValue").value,

    actualWt: document.getElementById("actualWt").value,
    chargedWt: document.getElementById("chargedWt").value,

    deliveryAt: document.getElementById("deliveryAt").value,

    freight: document.getElementById("freight").value,
    lrCharge: document.getElementById("lrCharge").value,
    grandTotal: document.getElementById("grandTotal").value,

    privateMark: document.getElementById("privateMark").value,
    remarks: document.getElementById("remarks").value,

    ewayBill: document.getElementById("ewayBill").value,
    bookedBy: document.getElementById("bookedBy").value
};

localStorage.setItem(
    "lrData",
    JSON.stringify(lrData)
);

window.open(
    "lr-template.html",
    "_blank"
);


}

// ===============================
// SAVE AND PRINT
// ===============================

async function saveAndPrint() {

    const data = {

        lrNo: document.getElementById("lrNo").value,
        date: document.getElementById("bookingDate").value,
        time: document.getElementById("bookingTime").value,

        fromBranch: document.getElementById("fromBranch").value,
        toBranch: document.getElementById("toBranch").value,

        freightType: document.getElementById("freightType").value,

        consignor: document.getElementById("consignorName").value,
        consignee: document.getElementById("consigneeName").value,

        mobile: document.getElementById("consignorMobile").value,

        qty: document.getElementById("artQty").value,
        article: document.getElementById("articleType").value,

        freight: document.getElementById("freight").value,
        total: document.getElementById("grandTotal").value,

        bookedBy: document.getElementById("bookedBy").value
    };

    try {

        await fetch(
             "https://script.google.com/macros/s/AKfycbxDnRWhLIg6IFepYMwowePqMrgx6yCxaikLYC8VS4EHKbN4sSgZViLdEE1OIt988yvl/exec",
            {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify(data)
            }
        );

        alert("LR Saved Successfully");

        printLR();

    } catch (err) {

        console.error(err);

        alert("Save Failed");
    }
}