
jQuery(document).ready(function($) {
    // Perform the AJAX request
    $.ajax({
          
        url: 'https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2?include=image&token=9962098a5f6c6ae8d16ad5aba95afee0&filter[classifications][in][withSubtree][]=3b9b4787-99e5-47c1-8d09-db65c1db43cc',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            // Assuming the classifications are within the "@graph" array
            var classifications = response['@graph'];

            // Process and display the classifications
            classifications.forEach(function(classification) {
                var label = classification['skos:prefLabel'];
                var parentLabel = classification['skos:broader'] ? classification['skos:broader']['@id'] : 'No parent';

                // Append to an element on the page
                $('#classification-container').append('<p>' + label + ' (Parent: ' + parentLabel + ')</p>');
            });
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });
});

// jQuery(document).ready(function($) {
//     $.ajax({
//         url: "https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2?include=image&token=9962098a5f6c6ae8d16ad5aba95afee0",
//         method: "GET",
//         success: function(response) {
//             // Assuming the response is in JSON format
//             if (response && response["@graph"]) {
//                 var classifications = response["@graph"];
//                 classifications.forEach(function(classification) {
//                     var label = classification["skos:prefLabel"];
//                     var broader = classification["skos:broader"];
//                     var ancestors = classification["skos:ancestors"];
                    
//                     // Display or process the classifications here
//                     console.log("Label: " + label);
//                     if (broader) {
//                         console.log("Broader ID: " + broader["@id"]);
//                     }
//                     if (ancestors && ancestors.length > 0) {
//                         ancestors.forEach(function(ancestor) {
//                             console.log("Ancestor ID: " + ancestor["@id"]);
//                         });
//                     }
//                 });
//             } else {
//                 console.log("No classifications found.");
//             }
//         },
//         error: function(error) {
//             console.error("Error fetching the classifications: ", error);
//         }
//     });
// });


// const apiUrl = "https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2?token=9962098a5f6c6ae8d16ad5aba95afee0";
// let pageSize = 4;
// let pageNumber = 1;

// async function loadData() {
//     try {
//         const response = await fetch(`${apiUrl}&page[size]=${pageSize}&page[number]=${pageNumber}`);
//         const data = await response.json();

//         displayData(data['@graph']);

//         if (pageNumber >= data.meta.pages) {
//             document.getElementById('load-more').style.display = 'none';
//         }
//     } catch (error) {
//         console.error('Error loading data:', error);
//     }
// }

// function displayData(items) {
//     const container = document.getElementById('datacycle-container');
//     items.forEach(item => {
//         const itemElement = document.createElement('div');
//         itemElement.textContent = item.name; 
//         container.appendChild(itemElement);
//     });
// }

// document.getElementById('load-more').addEventListener('click', function() {
//     pageNumber++;
//     loadData();
// });

// window.onload = loadData;
