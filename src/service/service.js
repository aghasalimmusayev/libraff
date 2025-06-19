import axiosInstance from "./Instance";

async function getData() {
  try {
    const res = await axiosInstance.get("/Kitablar");
    return res.data;
  } catch (error) {
    console.log("KitablarData-da xeta: " + error);
  }
}

async function getSlides() {
  try {
    const sld = await axiosInstance.get("/Slider");
    return sld.data;
  } catch (error) {
    console.log("Slider-de xeta: " + error);
  }
}

async function getKitabByID(id) {
  try {
    const book = await axiosInstance.get(`/Kitablar/${id}`);
    return book.data;
  } catch (error) {
    console.log("KitabID-de xeta: " + error);
  }
}

async function delBooks(id) {
  try {
    const delBook = await axiosInstance.delete(`Kitablar/${id}`);
    return delBook.data;
  } catch (error) {
    console.log("Silinmede xeta bas verdi: " + error);
  }
}

async function editBooks(id) {
  try {
    const editBook = await axiosInstance.put(`Kitablar/${id}`);
    return editBook.data;
  } catch (error) {
    console.log("Edit-de XETA bas verdi- " + error);
  }
}

export { getData, getSlides, getKitabByID, delBooks, editBooks };
