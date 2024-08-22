const apiUrl =
    "https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2?include=image&token=9962098a5f6c6ae8d16ad5aba95afee0";
let pageSize = 4;
let pageNumber = 1;

async function loadData() {
    try {
        document.getElementById("spinner-container").style.display = "block";

        const response = await fetch(
            `${apiUrl}&page[size]=${pageSize}&page[number]=${pageNumber}`
        );
        const data = await response.json();

        displayData(data["@graph"]);

        if (pageNumber >= data.meta.pages) {
            document.getElementById("load-more").style.display = "none";
        }
    } catch (error) {
        console.error("Error loading data:", error);
    } finally {
        // Hide the spinner
        document.getElementById("spinner-container").style.display = "none";
    }
}

function displayData(items) {
    const container = document.getElementById("datacycle-container");
    items.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("st-content");
        const startDate = item.startDate ? new Date(item.startDate) : null;
        const endDate = item.endDate ? new Date(item.endDate) : null;

        const formatStartDate = startDate
            ? startDate.toISOString().split("T")[0]
            : "Unknown time";
        const formattedEndDate = endDate
            ? endDate.toISOString().split("T")[0]
            : "Unknown time";

        const formattedStartTime = startDate
            ? startDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            })
            : "Unknown time";
        const formattedEndTime = endDate
            ? endDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            })
            : "Unknown time";

        const location = Array.isArray(item.location) ? item.location : [];
        const locationName =
            location.length > 0 ? "Location Data Available" : "No location provided";
        let location_id =
            location[0] && location[0]["@type"] ? location[0]["@type"][1] : null;
        location_id = location_id ? location_id.replace(/^dcls:/, "") : null;

        itemElement.innerHTML = `
        <a href="#">
        <div class="row">
            <div class="col-lg-3">
                <div class="sc-pic">
                    <img src="${item.image
                ? item.image[0].contentUrl
                : "img/schedule/schedule-2.jpg"
            }" alt="${item.name}">
                </div>
            </div>
            <div class="col-lg-5">
                <div class="sc-text">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                </div>
            </div>
                        <div class="col-lg-2">
                            <ul class="sc-widget">
                                <li><i class="fa fa-map-marker"></i></li>
                                <li class="font-weight-bold">
                                 ${locationName ? location_id : locationName}
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-2">
                            <ul class="sc-widget">
                                <li><i class="fa fa-clock-o"></i></li>
                                <li class="font-weight-bold px-0" style="font-size: 14px;">${formatStartDate}</li>
                                <li class="font-weight-bold px-0" style="font-size: 14px;">${formattedStartTime}</li>
                                <li class="font-weight-bold px-0" style="font-size: 14px;">Bis</li>
                                <li class="font-weight-bold px-0" style="font-size: 14px;">${formattedEndDate}</li>
                                <li class="font-weight-bold px-0" style="font-size: 14px;">${formattedEndTime}</li>
                             </ul>
                        </div>            
            </div>
            </a>
        `;
        container.appendChild(itemElement);
    });
}

document.getElementById("load-more").addEventListener("click", function () {
    pageNumber++;
    loadData();
});

window.onload = loadData;
