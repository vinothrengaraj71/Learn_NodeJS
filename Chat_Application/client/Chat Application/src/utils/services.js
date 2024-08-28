export const baseUrl = "http://127.0.0.1:3000/api";

export const postLoginRequest = async (url, body,headers={}) => {
    const response = await fetch(url, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      
    });

    const data = await response.json();
  
    if (!response.ok) {
      let message;
  
      if (data?.message) {
        message = data.message;
      } else {
        message = data;
      }
  
      return { error: true, message };
    }
    return data;
  };

  export const postRegisterRequest = async (url, body) => {
    const response = await fetch(url, {
      method: "POST",
      body: body,
    });

    const data = await response.json();
  
    if (!response.ok) {
      let message;
  
      if (data?.message) {
        message = data.message;
      } else {
        message = data;
      }
  
      return { error: true, message };
    }
    return data;
  };

  
export const getRequest = async (url)=>{
  const response = await fetch(url)
  const data = await response.json()

  if(!response.ok){
    let message = "An error occured..."

    if(data?.message){
      message = data.message
    }

    return {error:true,message}
  }

  return data;
};
