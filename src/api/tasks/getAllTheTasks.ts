export const getAllTheTasks = async (
    page: number = 1,
    completed?: boolean
  ) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token.");
    }
  
    const url = new URL(`${process.env.REACT_APP_BACKEND_URL}/tasks`);
    url.searchParams.append("page", String(page));
    if (completed !== undefined) {
      url.searchParams.append("completed", String(completed));
    }
  
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Error al obtener las tareas");
    }
  
    return response.json();
  };