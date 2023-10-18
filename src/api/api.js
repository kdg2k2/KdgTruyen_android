// src/api/api.js

const fetchData = async (url) => {
    const response = await fetch('http://127.0.0.1:8000/api/'+ url);
    const data = await response.json();
    // console.log(data);
    return data;
  };
  
  export default fetchData;
  