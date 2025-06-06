import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

async function getData() {
  try {
    const res = await axios.get(`${BASE_URL}/Kitablar`);
    return res.data;
  } catch (error) {
    console.log("KitablarData-da xeta: " + error);
  }
}

async function getSlides() {
  try {
    const sld = await axios.get(`${BASE_URL}/Slider`);
    return sld.data;
  } catch (error) {
    console.log("Slider-de xeta: " + error);
  }
}

async function getKitabByID(id) {
  try {
    const book = await axios.get(`${BASE_URL}/Kitablar/${id}`);
    return book.data
  } catch (error) {
    console.log("KitabID-de xeta: " + error);
  }
}

export { getData, getSlides, getKitabByID };
