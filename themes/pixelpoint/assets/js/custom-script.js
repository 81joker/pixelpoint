

const apiUrl = "https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2?include=image&token=9962098a5f6c6ae8d16ad5aba95afee0";
let pageSize = 4;
let pageNumber = 1;

async function loadData() {
    try {
        document.getElementById('spinner-container').style.display = 'block';

        const response = await fetch(`${apiUrl}&page[size]=${pageSize}&page[number]=${pageNumber}`);
        const data = await response.json();

        displayData(data['@graph']);

        if (pageNumber >= data.meta.pages) {
            document.getElementById('load-more').style.display = 'none';
        }
    } catch (error) {
        console.error('Error loading data:', error);
    } finally {
        // Hide the spinner
        document.getElementById('spinner-container').style.display = 'none';
    }
}

function displayData(items) {
    const container = document.getElementById('datacycle-container');
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('st-content');
        itemElement.innerHTML = `
        <a href="#">
        <div class="row">
            <div class="col-lg-3">
                <div class="sc-pic">
                    <img src="${item.image ? item.image[0].contentUrl : 'img/schedule/schedule-2.jpg'}" alt="${item.name}">
                </div>
            </div>
            <div class="col-lg-5">
                <div class="sc-text">
                    <h4>${item.name}</h4>
                    <ul>
                        <li><i class="fa fa-user"></i> ${item.organizer || 'Unknown Organizer'}</li>
                        <li><i class="fa fa-envelope"></i> ${item.contactPoint ? item.contactPoint[0].email : 'No contact available'}</li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-4">
                <ul class="sc-widget">
                    <li><i class="fa fa-clock-o"></i> ${item.startDate || 'Unknown Time'}</li>
                    <li><i class="fa fa-map-marker"></i> ${item.location ? item.location[0].name : 'Unknown Location'}</li>
                </ul>
            </div>
            </div>
            </a>
        `;
        container.appendChild(itemElement);
    });
}

document.getElementById('load-more').addEventListener('click', function() {
    pageNumber++;
    loadData();
});

window.onload = loadData;
