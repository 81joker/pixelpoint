<?php
/* Template Name: About Template */
?>
<?php get_header(); ?>
<?php
// Ensure the file is not accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Function to handle the CSV import
function csv_import_data() {
    // Check if a file has been uploaded
    if ( isset( $_FILES['csv_file'] ) && $_FILES['csv_file']['error'] == UPLOAD_ERR_OK ) {
        $file = $_FILES['csv_file']['tmp_name'];

        // Open the CSV file
        $handle = fopen( $file, 'r' );

        // Get the first row as the header
        $header = fgetcsv( $handle );

        // Loop through the remaining rows and insert the data
        while ( ( $row = fgetcsv( $handle ) ) !== false ) {
            $data = array_combine( $header, $row );

            // Process the data and save it to the database or perform other actions
            // Example: Insert the data into a custom post type
            $post_id = wp_insert_post(
                array(
                    'post_title'   => $data['name'],
                    'post_content' => $data['description'],
                    'post_type'    => 'your_custom_post_type',
                    'post_status'  => 'publish',
                )
            );

            // Add additional meta fields if needed
            update_post_meta( $post_id, 'start_date', $data['startDate'] );
            update_post_meta( $post_id, 'end_date', $data['endDate'] );
        }

        // Close the CSV file
        fclose( $handle );

        // Redirect to a success page or display a success message
        wp_redirect( admin_url( 'admin.php?page=csv-import&message=success' ) );
        exit;
    } else {
        // Redirect to the import page with an error message
        wp_redirect( admin_url( 'admin.php?page=csv-import&message=error' ) );
        exit;
    }
}

// Add a new admin menu page for the CSV import
add_action( 'admin_menu', 'csv_import_menu' );
function csv_import_menu() {
    add_menu_page(
        'CSV Import',
        'CSV Import',
        'manage_options',
        'csv-import',
        'csv_import_page'
    );
}

// Display the CSV import page
function csv_import_page() {
    // Check for any error or success messages
    $message = isset( $_GET['message'] ) ? $_GET['message'] : '';
    ?>
    <div class="wrap">
        <h1>CSV Import</h1>
        <?php if ( $message == 'success' ) : ?>
            <div class="notice notice-success is-dismissible">
                <p>CSV import successful!</p>
            </div>
        <?php elseif ( $message == 'error' ) : ?>
            <div class="notice notice-error is-dismissible">
                <p>Error uploading the CSV file.</p>
            </div>
        <?php endif; ?>
        <form action="<?php echo admin_url( 'admin-post.php' ); ?>" method="post" enctype="multipart/form-data">
            <input type="hidden" name="action" value="csv_import_data">
            <p>
                <label for="csv_file">Choose a CSV file:</label>
                <input type="file" name="csv_file" id="csv_file" required>
            </p>
            <p>
                <input type="submit" class="button button-primary" value="Import CSV">
            </p>
        </form>
    </div>
    <?php
}

// Hook the CSV import function to the admin_post action
add_action( 'admin_post_csv_import_data', 'csv_import_data' );

<?php get_footer(); ?>