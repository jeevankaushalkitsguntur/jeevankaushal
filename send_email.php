<?php
// Check if the form was submitted using the POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Set the recipient email address
    $recipient = "kitsjeevankoushal@gmail.com";

    // Collect and sanitize the form data
    // strip_tags() removes any HTML tags from the input
    // trim() removes whitespace from the beginning and end
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Create the email subject from the user's name
    $subject = "New message from " . $name;

    // Build the email headers
    // This is crucial for setting the "From" address
    $email_headers = "From: " . $name . " <" . $email . ">\r\n";
    $email_headers .= "Reply-To: " . $email . "\r\n";

    // Send the email using PHP's built-in mail() function
    if (mail($recipient, $subject, $message, $email_headers)) {
        // Redirect the user to a "thank you" page on success
        header("Location: thank_you.html");
        exit; // Stop the script from executing further
    } else {
        // Redirect to an error page if sending fails
        header("Location: error.html");
        exit;
    }

} else {
    // If someone tries to access this script directly, redirect them away
    header("Location: index.html");
    exit;
}
?>