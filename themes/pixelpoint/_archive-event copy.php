<?php
// Get the API response
$response = wp_remote_get('https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2?token=9962098a5f6c6ae8d16ad5aba95afee0');

// Check for any errors
if (is_wp_error($response)) {
    echo 'Error: ' . $response->get_error_message();
    return;
}

// Get the response body
$data = json_decode(wp_remote_retrieve_body($response), true);

// Check if the data is valid
if (!is_array($data) || empty($data['@graph'])) {
    echo 'No data available.';
    return;
}

// Loop through the events and display them
foreach ($data['@graph'] as $event) {
    echo '<h2>' . $event['name'] . '</h2>';
    echo '<p>' . $event['description'] . '</p>';
    echo '<p>Start Date: ' . date('F j, Y', strtotime($event['startDate'])) . '</p>';
    echo '<p>End Date: ' . date('F j, Y', strtotime($event['endDate'])) . '</p>';
    echo '<hr>';
}
?>