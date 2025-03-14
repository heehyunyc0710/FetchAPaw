// Function to handle login
export const handleLogin = async ({username, email}: {username: string, email: string}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username, 
        email: email, 
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
  

