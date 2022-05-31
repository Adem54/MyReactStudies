import React from "react";
import TextInput from "../toolbox/TextInput";

const ProductDetail = (
  //parametreler otomaikten hooks tarafindan geciriliyor
  categories,
  product,
  onSave,
  onChange
) => {
  //ProductDetail imiz onsubmit oldugu zaman onSave fonksiyonumuz calisacak nerden geldi, bize AddOrUpdateProduct componenti icinde calisiyor ProductDetailimiz ve ordan ProductDetail e props olarak gonderildi onSave,onChange,product,categories bunlar
  return (
    <form onSubmit={onSave}>
      <h2>{product.id ? "Guncelle" : "Ekle"}</h2>
      <TextInput
        name="productName"
        label="Product Name"
        value={product.productName}
        onChange={onChange}
        error="Hata"
      />
      <button type="submit" className="btn btn-success">
        Save
      </button>
    </form>
  );
};

export default ProductDetail;
