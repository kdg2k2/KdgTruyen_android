// src/api/api.js

const fetchData = async (url) => {
    const response = await fetch('http://127.0.0.1:8001/api/'+ url);
    // const response = await fetch('http://127.0.0.1:8000/api/'+ url);
    return response.json();
  };
  
  export default fetchData;
  