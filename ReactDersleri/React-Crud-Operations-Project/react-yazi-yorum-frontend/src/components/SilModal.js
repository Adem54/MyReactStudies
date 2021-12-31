import React,{useState} from "react";
import { Modal,Button } from "semantic-ui-react";
import {api} from "../api";
import {useNavigate} from "react-router-dom";
const SilModal=({yazi})=>{
 const [hata,setHata]=useState("");
const navigate=useNavigate();
 //oncelikle modal imizin acik mi kapali m i oldugunu takip edecek bir state e ihtiyacimiz var.Baslangicta bu state kapali olacak
 const [open,setOpen]=useState(false);
 //2 tane fonksiyona ihtiyacimiz var birisi modal imizi acacak olan fonks, digeri ise modal imizi kapatacak olan fonksiyondur
 const show=()=>setOpen(true);
 const close=()=>setOpen(false);
 const handleDelete=(id)=>{
api()
.delete(`/posts/${id}/`)
.then(()=>{
    setHata("");//Burda hata yok ise bir oncekinden kalan hatayi sifirlayalim ki islem basarili oldugunda hata silinsin
    //1-modal i close yapacagiz kapatacagiz yani popup gibi gelen modal in silme islemi gerceklestiginde kapatilmasini istiyoruz
    close();
    //2-yazi listesinin oldugu ana sayfaya navigate yapacagiz useNavigator araciligi ile
    navigate(`/`);
})
.catch(error=>{
    setHata("Yaziyi silerken bir hata olustu")
})
 }
    return(
        <React.Fragment>
            <Button color="red" onClick={show} >Sil</Button>
            <Modal size="mini" open={open} onClose={close}>
                <Modal.Header>Yaziyi Sil</Modal.Header>
                <Modal.Content>
                    <p><b>{yazi.title}</b> baslikli yaziyi silmek istediginize emin misiniz?</p>
                    {hata && <p>{hata}</p>}
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={close}>Iptal Et</Button>
                    <Button positive
                    icon="delete"
                    labelPosition="right"
                    content="Evet, Sil!"
                    onClick={e=>handleDelete(yazi.id)}
                    />
                    {
                        //Button un value olarak content kisminda ne yazacaginiz yazdiktan sonra, acilip kapanan buton degil de kendiliginden kapanan buton yapabiliiriz
                    }
                </Modal.Actions>
                
            </Modal>
        </React.Fragment>
    )
}

export default SilModal;