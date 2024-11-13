export const deleteATask = async (taskId: number | undefined) => {
    const token = localStorage.getItem("token");
    if (!token || !taskId) {
      throw new Error("No se encontró el token o el ID de la tarea.");
    }
  
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Error al eliminar la tarea");
    }
  
    return response.json();
  };