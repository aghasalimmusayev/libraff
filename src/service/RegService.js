import axiosInstance from "./Instance";

async function registraion() {
    try {
        const res = await axiosInstance.get("/users");
        return res.data;
    } catch (error) {
        console.error("Qeydiyyatda xeta bas verdi: " + error);
        throw new error();
    }
}

export default { registraion };
