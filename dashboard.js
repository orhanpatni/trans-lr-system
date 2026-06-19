window.onload = loadDashboard;

async function loadDashboard() {

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxDnRWhLIg6IFepYMwowePqMrgx6yCxaikLYC8VS4EHKbN4sSgZViLdEE1OIt988yvl/exec?action=getLRs"
        );

        const data = await response.json();

        // Total LR
        document.getElementById("totalLR").innerText =
            data.length;

        // Total Revenue
        let totalRevenue = 0;

        data.forEach(row => {
            totalRevenue += Number(row["Total"] || 0);
        });

        document.getElementById("totalRevenue").innerText =
            totalRevenue.toLocaleString();

        // Today

        const today = new Date().toISOString().split("T")[0];

        let todayLR = 0;
        let todayRevenue = 0;

        data.forEach(row => {

            if (!row["Date"]) return;

            const lrDate =
                new Date(row["Date"])
                .toISOString()
                .split("T")[0];

            if (lrDate === today) {

                todayLR++;

                todayRevenue +=
                    Number(row["Total"] || 0);
            }
        });

        document.getElementById("todayLR").innerText =
            todayLR;

        document.getElementById("todayRevenue").innerText =
            todayRevenue.toLocaleString();

    } catch (err) {

        console.error(err);

        alert("Dashboard Load Error");
    }
}