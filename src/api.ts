export const getWorkspaces = async () => {
  const response = await fetch("http://localhost:3000/api/workspace", {
    credentials: "include",
  });
  return response;
};

export const addWorkspace = async (payload: any) => {
  const response = await fetch("http://localhost:3000/api/workspace", {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(payload),
    headers: {'content-type': 'application/json'}
  });
  return response;
};

export const editWorkspace = async (payload:any,id:string) => {
  const response = await fetch(`http://localhost:3000/api/workspace/${id}`, {
    credentials: "include",
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {'content-type': 'application/json'}
  });
  return response;
}

export const getUser = async() =>{
  const response = await fetch("http://localhost:3000/api/user/me/profile", {
    credentials: "include",
  });
  return response;
}

export const getAllTasks = async (id:string) => {
  const response = await fetch(`http://localhost:3000/api/ticket/${id}`, {
    credentials: "include",
  });
  return response;
}

export const createTask = async (payload:any) => {
  const response = await fetch(`http://localhost:3000/api/ticket`, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(payload),
    headers: {'content-type': 'application/json'}
  });
  return response;
}

export const changeTaskStatus = async (payload:any,id:string) =>{
  const response = await fetch(`http://localhost:3000/api/ticket/${id}`, {
    credentials: "include",
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {'content-type': 'application/json'}
  });
  return response;
}