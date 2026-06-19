async function loadLRs() {

    const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxDnRWhLIg6IFepYMwowePqMrgx6yCxaikLYC8VS4EHKbN4sSgZViLdEE1OIt988yvl/exec?action=getLRs"
    );

    const data = await response.json();

    const tbody =
        document.querySelector("#lrTable tbody");

    tbody.innerHTML = "";

    data.forEach(row => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${row["LR No"] || ""}</td>
            <td>${row["Date"] || ""}</td>
            <td>${row["From Branch"] || ""}</td>
            <td>${row["To Branch"] || ""}</td>
            <td>${row["Consignor"] || ""}</td>
            <td>${row["Consignee"] || ""}</td>
            <td>${row["Total"] || ""}</td>
        `;

        tbody.appendChild(tr);

    });

}