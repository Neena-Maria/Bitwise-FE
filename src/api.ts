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
