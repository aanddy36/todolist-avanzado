export const createAnUser = async (data: {
    email: string;
    password: string;
  }) => {
    const response = await fetch("http://localhost:5000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error("Este email ya está registrado");
    }
  
    return response.json();
  };