<?php
// Update these variables with your database details
$host = "sql311.infinityfree.com";
$username = "if0_39139243";
$password = "fD1dqAcaH0dn";
$dbname = "if0_39139243_gw_contactus	";

// Create connection
$conn = mysqli_connect('localhost', 'root', '', 'gw_contactus');

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get and sanitize form inputs
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $message = mysqli_real_escape_string($conn, $_POST['message']);

    // Optional: Add phone if your form includes it
    $phone = isset($_POST['phone']) ? mysqli_real_escape_string($conn, $_POST['phone']) : '';

    // Insert into database (adjust table/columns as needed)
    $sql = "INSERT INTO contactform_entries (name, email, phone, message) VALUES ('$name', '$email', '$phone', '$message')";

    if (mysqli_query($conn, $sql)) {
        echo "Thank you for contacting us!";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
    mysqli_close($conn);
}
?>