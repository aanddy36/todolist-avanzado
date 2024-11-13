export const checkToken = async ({ token }: { token: string | null }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/checkToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
  
      if (response.status === 204) {
        return { valid: false };
      }
  
      if (response.ok) {
        const data = await response.json();
        return data;
      }
  
      throw new Error("Error al verificar el token");
    } catch (error) {
      console.error("Error en la verificación del token", error);
      return { valid: false };
    }
  };