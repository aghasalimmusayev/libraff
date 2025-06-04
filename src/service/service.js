import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL

async function getData() {
  try {
    const res = await axios.get(`${BASE_URL}/Kitablar`);
    return res.data;
  }
  catch (error) {
    console.log(error);
  }
}

async function getSlides() {
  try {
    const sld = await axios.get(`${BASE_URL}/Slider`)
    return sld.data
  } 
  catch (error) {
    console.log(error)
  }
}

export { getData, getSlides };
