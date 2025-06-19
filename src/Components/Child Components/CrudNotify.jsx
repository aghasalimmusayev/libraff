import React from "react";
import toast, { Toaster } from "react-hot-toast";

export const showAddSuccess = () => {
    toast.success('Yeni kitab uğurla əlavə edildi!', {
        duration: 3000,
        position: 'top-right',
    });
};

export const showUpdateSuccess = () => {
    toast.success('Dəyişikliklər uğurla tamamlandı!', {
        duration: 3000,
        position: 'top-right',
    });
};

export const showDeleteSuccess = () => {
    toast.success('Kitab uğurla silindi!', {
        duration: 5000,
        position: 'top-center',
    });
};

export const showError = (message) => {
    toast.error(message || 'Xəta baş verdi!', {
        duration: 4000,
        position: 'top-center',
    });
};

function CrudNotify() {
    return (
        <Toaster
            toastOptions={{
                style: {
                    background: '#363636',
                    color: '#fff',
                },
                success: { iconTheme: { primary: '#4aed88', }, },
                error: { iconTheme: { primary: '#ff4b4b', }, },
            }}
        />
    );
}

export default CrudNotify;
// Toaster component