export const createTask = async (id: number | undefined, task: { name: string }) => {
    const token = localStorage.getItem("token");
    if (!token || !id) {
      throw new Error("No se encontró el token o el ID del usuario.");
    }
  
    const userId = String(id);
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task), // Envía el objeto { name: string } en el cuerpo de la solicitud
    });
  
    if (!response.ok) {
      throw new Error("Error al crear la tarea");
    }
  
    return response.json();
  };