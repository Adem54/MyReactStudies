import React, { useEffect } from 'react';

const Modal = ({ modalContent, closeModal }) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 3000);
  });
  //closeModel invoke olunca isModelOpen false oluyor ve yeni data eklendiginde ekrana gelen 
  //data eklendi mesajin kullanici 3 saniye gorebiliyor
  return (
    <div className='modal'>
      <p>{modalContent}</p>
    </div>
  );
};

export default Modal;
