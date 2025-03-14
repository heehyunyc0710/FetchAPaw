// Function to handle login
export const handleLogin = async () => {
  const response = await fetch("/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "User Name", // Replace with actual user input
        email: "user@example.com", // Replace with actual user input
      }),
    });
  
    if (response.ok) {
      // Handle successful login
      console.log("Login successful");
    } else {
      // Handle login error
      console.error("Login failed");
    }
  };
  

