import React from 'react';
import { SlPencil, SlTrash, SlPlus } from "react-icons/sl";
import { useAllContext } from '../../Context/MyContext';
import '../CSS/admin.css';

function Admin() {

    const { bookData } = useAllContext()

    return (
        <div className="admin-container">

            <div className="admin-header">
                <h1 className='admin_head'>Admin Panel</h1>
                <button className="add-btn">
                    <SlPlus />
                    Yeni Kitab
                </button>
            </div>

            <div className="main_info">
                <div className="main_info_heading">
                    <h3>Ümumi Kitablar</h3>
                    <p className="main_result blue">{bookData.length}</p>
                </div>
                <div className="main_info_heading">
                    <h3>Ümumi Stok</h3>
                    <p className="main_result green">318</p>
                </div>
                <div className="main_info_heading">
                    <h3>Satılan</h3>
                    <p className="main_result purple">156</p>
                </div>
            </div>

            {/* Table */}
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
                        {bookData?.map((book) => (
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
                                        <button className="edit-btn">
                                            <SlPencil />
                                        </button>
                                        <button className="delete-btn">
                                            <SlTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Admin;