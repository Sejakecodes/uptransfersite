<?php
session_start();

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rrr";;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Prepare and bind
    $stmt = $conn->prepare("SELECT id, username, password_hash, profile_picture, roles FROM users WHERE username = ?");
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("s", $username);
    if (!$stmt->execute()) {
        die("Execute failed: " . $stmt->error);
    }

    $stmt->store_result();

    // Check if user exists
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $username, $hashed_password, $profile_picture, $roles);
        $stmt->fetch();
        
        // Verify password
        if (password_verify($password, $hashed_password)) {
            // Start session and store user information
            $_SESSION['id'] = $id;
            $_SESSION['username'] = $username;
            $_SESSION['profile_picture'] = $profile_picture;
            $_SESSION['roles'] = $roles;
            
            if ($roles == 'admin') {
                header("Location: admin_sales_dash.php");
            } else if ($roles == 'user') {
                header("Location: user_lead.php");
            } else {
                echo "Invalid role.";
            }
            exit;
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "No user found with that username.";
    }

    $stmt->close();
}

$conn->close();
?>
