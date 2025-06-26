import axiosInstance from "./Instance";

async function registerUser(userData) {
    try {
        const userVarsa = await axiosInstance.get(`/users?email=${userData.email}`);
        if (userVarsa.data.length > 0) {
            return {
                success: false,
                message: "Bu email artıq istifadə olunur!",
            };
        }
        const res = await axiosInstance.post("/users", userData);
        return {
            success: true,
            message: "Qeydiyyat uğurla tamamlandı!",
            data: res.data,
        };
    } catch (error) {
        console.error("Qeydiyyatda xəta: " + error);
        return {
            success: false,
            message: "Xəta baş verdi: " + error.message,
        };
    }
}

async function loginUser(user) {
    const res = await axiosInstance.get(`/users?email=${user.email}&parol=${user.parol}`);
    if (!res.data.length) {
        throw new Error("email or your password is invalid");
    }
    return res.data[0];
}

export { registerUser, loginUser };
