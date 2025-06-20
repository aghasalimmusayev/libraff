import React, { useEffect, useState } from 'react';
import './adminCSS/modal.css';
import { useAllContext } from '../../../Context/MyContext';
import CrudNotify, { showError, showUpdateSuccess } from '../../Child Components/CrudNotify';
import { editBooks } from '../../../service/service';

function EditModal({ editClose, bookId, setBookId }) {

  const { bookData, setBookData } = useAllContext()
  const selectedBook = bookData.find(item => item.id == bookId)
  const [formData, setFormData] = useState({
    Title: "",
    Müəllif: "",
    OriginalPrice: 0,
    DiscountPrice: 0,
    Dil: "",
    CategoryName: "",
    stokSayi: 0,
    satildi: 0,
    baxildi: 0,
    sekil: "",
    description: ""
  });

  useEffect(() => {
    if (selectedBook) {
      setFormData({
        Title: selectedBook.Title,
        Müəllif: selectedBook.Müəllif,
        OriginalPrice: selectedBook.OriginalPrice,
        DiscountPrice: selectedBook.DiscountPrice,
        Dil: selectedBook.Dil,
        CategoryName: selectedBook.CategoryName,
        stokSayi: selectedBook.stokSayi,
        satildi: selectedBook.satildi,
        baxildi: selectedBook.baxildi,
        sekil: selectedBook.sekil,
        description: selectedBook.description
      });
    }
  }, [selectedBook]);

  async function editThisBook(e) {
    e.preventDefault()
    try {
      await editBooks(bookId, formData)
      setBookData(bookData.map(book => book.id === bookId ? { ...book, ...formData } : book))
      showUpdateSuccess()
      setBookId(null)
      editClose()
    }
    catch {
      console.log("Kitab edit edilmədi: " + error);
      showError('Kitab edit edilərkən xəta baş verdi')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div className="modal-overlay" onClick={editClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Kitabı Redaktə Et</h2>

        <form onSubmit={editThisBook}>
          <div className="modal-body">
            <div className="modal-fields">
              <label>
                Başlıq:
                <input name='Title' type="text" value={formData.Title} onChange={handleChange} />
              </label>
              <label>
                Müəllif:
                <input name='Müəllif' type="text" value={formData.Müəllif} onChange={handleChange} />
              </label>
              <label>
                Qiymət:
                <input name='OriginalPrice' type="number" value={formData.OriginalPrice} onChange={handleChange} />
              </label>
              <label>
                Endirimli Qiymət:
                <input name='DiscountPrice' type="number" value={formData.DiscountPrice} onChange={handleChange} />
              </label>
              <label>
                Dil:
                <input name='Dil' type="text" value={formData.Dil} onChange={handleChange} />
              </label>
              <label>
                Kateqoriya:
                <input name='CategoryName' type="text" value={formData.CategoryName} onChange={handleChange} />
              </label>
              <label>
                Stok Sayı:
                <input name='stokSayi' type="number" value={formData.stokSayi} onChange={handleChange} />
              </label>
              <label>
                Şəkil URL:
                <input name='sekil' type="text" value={formData.sekil} onChange={handleChange} />
              </label>
              <label>
                Təsvir:
                <textarea name='description' rows="4" value={formData.description} onChange={handleChange} />
              </label>
            </div>
          </div>
          <div className="modal-actions">
            <button className="save-btn" type='submit'>Yadda saxla</button>
            <button className="cancel-btn" type='button' onClick={editClose}>Ləğv et</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
