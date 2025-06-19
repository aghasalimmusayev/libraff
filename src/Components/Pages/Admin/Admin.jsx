import React, { useState } from 'react';
import { SlPencil, SlTrash, SlPlus } from "react-icons/sl";
import { useAllContext } from '../../../Context/MyContext';
import { delBooks, editBooks } from '../../../service/service'
import './adminCSS/admin.css';
import CrudNotify, { showDeleteSuccess, showError, showAddSuccess, showUpdateSuccess } from '../../Child Components/CrudNotify';
import AdminLoading from './AdminLoading'
import EditModal from './EditModal';
import EditModal2 from './EditModal';

function Admin() {

    const { bookData, setBookData } = useAllContext()
    const stokSayi = bookData?.reduce((acc, book) => acc + book.stokSayi, 0)
    const satis = bookData?.reduce((acc, book) => acc + book.satildi, 0)
    const [editOpen, setEditOpen] = useState(false)

    async function kitabSil(id) {
        try {
            // await delBooks(id)
            setBookData(bookData.filter(item => item.id !== id))
            showDeleteSuccess();
        } catch (error) {
            console.log("Kitab silinmedi- " + error);
            showError('Kitab silinerken XETA bas verdi')
        }
    }
    async function kitabDeyis(id) {
        setEditOpen(true)
        console.log(bookData.find(item => item.id === id));
    }
    function onClose(){
        setEditOpen(false)
    }

    return (
        <div className="admin-container">
            <CrudNotify />
            <div className="admin-header">
                <h1 className='admin_head'>Admin Panel</h1>
                <button className="add-btn">
                    <SlPlus />
                    Yeni Kitab
                </button>
            </div>
            {editOpen && <EditModal2 onClose={onClose}/>}
            {editOpen && console.log("EditOpen deyisdi: " + editOpen)}
            <div className="main_info">
                <div className="main_info_heading">
                    <h3>Ümumi Kitablar</h3>
                    <p className="main_result blue">{bookData?.length}</p>
                </div>
                <div className="main_info_heading">
                    <h3>Ümumi Stok</h3>
                    <p className="main_result green">{stokSayi}</p>
                </div>
                <div className="main_info_heading">
                    <h3>Satılan</h3>
                    <p className="main_result purple">{satis}</p>
                </div>
            </div>
            <div className="table-container">
                <table className="books-table">
                    <thead>
                        <tr>
                            <th>Kitab Adı</th>
                            <th>Müəllif</th>
                            <th>Qiymət</th>
                            <th>Stok</th>
                            <th>Satıldı</th>
                            <th>Əməliyyat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookData?.length > 0 &&
                            bookData.map((book) => (
                                <tr key={book.id}>
                                    <td>
                                        <div className="book-info">
                                            <div className="book-title">{book.Title}</div>
                                            <div className="book-category">{book.CategoryName}</div>
                                        </div>
                                    </td>
                                    <td>{book.Müəllif}</td>
                                    <td>{book.OriginalPrice} ₼</td>
                                    <td>
                                        <span className={`stock ${book.stokSayi > 10 ? 'high' :
                                            book.stokSayi > 0 ? 'medium' : 'low'}`}>
                                            {book.stokSayi}
                                        </span>
                                    </td>
                                    <td>{book.satildi}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="edit-btn" onClick={() => kitabDeyis(book.id)}>
                                                <SlPencil />
                                            </button>
                                            <button className="delete-btn" onClick={() => kitabSil(book.id)}>
                                                <SlTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {bookData.length == 0 &&
                    <div className="adminLoading">
                        <p className='loading_text'>Loading ...</p>
                        <AdminLoading />
                    </div>}
            </div>
        </div >
    );
}

export default Admin;