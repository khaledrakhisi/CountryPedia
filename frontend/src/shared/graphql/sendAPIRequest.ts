const sendAPIRequest = async (url: string, params = {}, method = "POST", token = false) => {
  try {
    const response = await fetch(url, {
      method,
      mode: "cors",
      headers: buildHeaders(token),
      body: JSON.stringify(params),
    });
    return response.json();
    
  } catch (err) {
    console.error(err);
  }
};

const buildHeaders = (token = false): Headers => {
  let headers = new Headers();
  headers.append("Content-type", "application/json");
  if (token) {
    headers.append("authorization", `JWT ${token}`);
  }
  return headers;
};

export default sendAPIRequest;
