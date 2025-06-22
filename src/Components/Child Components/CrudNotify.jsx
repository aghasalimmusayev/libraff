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

export const showRegSuccess = () => {
    toast.success('Qeydiyyatiniz ugurla tamamlandi!', {
        duration: 4000,
        position: 'top-center',
    });
}

export const showRegFailed = (message) => {
    toast.error(message || 'Bu email adress ile artiq qeydiyyat movcuddur!', {
        duration: 5000,
        position: 'top-center',
    });
}

function CrudNotify() {
    return (
        <Toaster
            toastOptions={{
                style: {
                    background: '#fff',
                    color: '#363636',
                },
                success: { iconTheme: { primary: '#4aed88', }, },
                error: { iconTheme: { primary: '#ff4b4b', }, },
            }}
        />
    );
}

export default CrudNotify;