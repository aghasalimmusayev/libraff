import React, { useEffect, useState } from 'react';
import { SlPencil, SlTrash, SlPlus } from "react-icons/sl";
import { useAllContext } from '../../../Context/MyContext';
import { delBooks } from '../../../service/service'
import './adminCSS/admin.css';
import CrudNotify, { showDeleteSuccess, showError } from '../../Child Components/CrudNotify';
import AdminLoading from './AdminLoading'
import AddModal from './AddModal'
import EditModal from './EditModal';

function Admin() {

    const { bookData, setBookData } = useAllContext()

    const stokdaVar = bookData?.reduce((acc, book) => {
        const stok = Number(book.stokSayi) || 0;
        return acc + stok;
    }, 0);
    const satis = bookData?.reduce((acc, book) => {
        const satis = Number(book.satildi) || 0;
        return acc + satis;
    }, 0);

    const [addOpen, setAddOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [bookId, setBookId] = useState(null)

    function AddClose() {
        setAddOpen(false)
    }
    function addNewBook() {
        setAddOpen(true)
    }

    async function kitabSil(id) {
        try {
            await delBooks(id)
            setBookData(bookData.filter(item => item.id !== id))
            showDeleteSuccess();
        } catch (error) {
            console.log("Kitab silinmedi- " + error);
            showError('Kitab silinerken XETA bas verdi')
        }
    }

    function kitabDeyis(id) {
        setEditOpen(true)
        setBookId(id)
    }
    function editClose() {
        setEditOpen(false)
        setBookId(null)
    }

    return (
        <div className="admin-container">
            <CrudNotify />
            <div className="admin-header">
                <h1 className='admin_head'>Admin Panel</h1>
                <button className="add-btn" onClick={addNewBook}>
                    <SlPlus />
                    Yeni Kitab
                </button>
            </div>
            {addOpen && <AddModal AddClose={AddClose} />}
            {editOpen && <EditModal editClose={editClose} bookId={bookId} setBookId={setBookId} />}
            <div className="main_info">
                <div className="main_info_heading">
                    <h3>Ümumi Kitablar</h3>
                    <p className="main_result blue">{bookData?.length}</p>
                </div>
                <div className="main_info_heading">
                    <h3>Ümumi Stok</h3>
                    <p className="main_result green">{stokdaVar}</p>
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
                {bookData?.length == 0 &&
                    <div className="adminLoading">
                        <p className='loading_text'>Loading ...</p>
                        <AdminLoading />
                    </div>}
            </div>
        </div >
    );
}

export default Admin;