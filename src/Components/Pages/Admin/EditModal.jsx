import React from 'react';
import './adminCSS/modal2.css';

function EditModal2({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Kitabı Redaktə Et</h2>

        <div className="modal-body">
          <div className="modal-fields">
            <label>
              Başlıq:
              <input type="text" defaultValue="Lev Tolstoy - Seçilmiş əsərləri" />
            </label>
            <label>
              Müəllif:
              <input type="text" defaultValue="Lev Tolstoy" />
            </label>
            <label>
              Qiymət:
              <input type="text" defaultValue="9.00" />
            </label>
            <label>
              Endirimli Qiymət:
              <input type="text" defaultValue="7.20" />
            </label>
            <label>
              Dil:
              <input type="text" defaultValue="AZE" />
            </label>
            <label>
              Kateqoriya:
              <input type="text" defaultValue="biography-autobiography-and-memoir" />
            </label>
            <label>
              Stok Sayı:
              <input type="number" defaultValue="5" />
            </label>
            <label>
              Şəkil URL:
              <input
                type="text"
                defaultValue="https://www.libraff.az/images/thumbnails/400/600/from_1c/7bb4b02e-faef-11ed-a519-503eaa120fc7_1.jpg.webp"
              />
            </label>
            <label>
              Təsvir:
              <textarea rows="4" defaultValue="Bu kitabda dahi rus yazıçısı Lev Tolstoyun həyat və yaradıcılığı ilə bağlı məlumat verilib..." />
            </label>
          </div>
        </div>

        <div className="modal-actions">
          <button className="save-btn">Yadda saxla</button>
          <button className="cancel-btn" onClick={onClose}>Ləğv et</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal2;
