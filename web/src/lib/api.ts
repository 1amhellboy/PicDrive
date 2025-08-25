// It’s the base URL of our backend API
const API_BASE = import.meta.env.VITE_API_BASE_URL;


// export const registerUser = async (email:string,password:string,name:string) => {
//   try {
//     console.log("Sending payload:", { name, email, password });
//     const res = await fetch(`${API_BASE}/auth/signup`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, email, password })
//     });
//     const data = await res.json();
//     console.log("Response:", data);
//     if (!res.ok) throw new Error(data.message || 'Registration failed');
//     return data;
//   } catch (err) {
//     console.error("Register error:", err);
//     throw err;
//   }
// };

export const registerUser = async (email: string, password: string, name: string) => {
  try {
    console.log("Sending payload:", { name, email, password });
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    console.log("Response:", data);

    if (!res.ok) {
      // Now it reads backend's `error` property too
      throw new Error(data.error || data.message || 'Registration failed');
    }

    return data;
  } catch (err) {
    console.error("Register error:", err);
    throw err;
  }
};


export const loginUser = async(email:string,password:string)=>{
    const res = await fetch(`${API_BASE}/auth/login`,{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({email,password}),
    });

    if(!res.ok) throw new Error("Login failed");
    return res.json();
}


// These functions send data to your backend — specifically to:
// /auth/register (to register a new user)
// /auth/login (to log in an existing user)
// They send the email & password to your backend API using fetch() and get a response — like “user created” or “token for login”.