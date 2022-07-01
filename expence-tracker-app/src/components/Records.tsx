import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Space, Table, Tag } from 'antd';
import  { Fragment, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../store'
import { addRecord, deleteRecord, getRecords, updateRecord } from '../store/actions/recordActions';
import { CategoryType, CategoryDispatch } from '../types/category';
import { Mode } from '../types/general';
import { RecordDispatch, RecordForm, RecordType } from '../types/record';
import { getCategories } from '../store/actions/categoryActions';




const initialRecordForm: RecordForm = {
  title: "",
  amount: 0,//amount 0 veriyoruz cunku amount ilk basta 0 olacak zaten
  category_id: 0,
  //category_id yi 0 vermiyoruz cunku 0 dan id olmaz
};
const Records = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<RecordForm>(initialRecordForm);
  // const { name, type,color } = form;
  const { title, amount,category_id } = form;

  const[updateId,SetUpdateId]=useState<number | null>(null);
  const[deleteId,SetDeleteId]=useState<number | null>(null);
  const {data,loading,error}=useSelector((state:AppState)=>state.records);
  console.log("record-data: ",data);
  const {data:categories}=useSelector((state:AppState)=>state.categories);
  
  const dispatch=useDispatch<RecordDispatch>();
  const dispatchCategory=useDispatch<CategoryDispatch>();


  //title, amount ve category_id her ucude required ondan dolayi 3 unu de zorunlu
  //olcak, sekilde logic yapip bunu bir degskene atayacagiz....
  //3 alandan en az 1 i bos ise, buton u disabled yapacagiz....
  //title-bos ise,amount category_id 0 den en az 1 i true gelirse false gelecek validForm degiskeni
  const isFormValid=!(!title || amount===0 || category_id===0);
  //Ya da soyle birsey diyebilirz 3 u birden true degil ise boyle yapilir
  const isMyFormValid=title && amount && category_id;//her ucu e ayni anda true degil ise
  useEffect(()=>{
    dispatch(getRecords());
     !categories.length && dispatchCategory(getCategories());
  },[])
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text: RecordType["amount"], record: RecordType) => {
        //text demek amount degeridiri, biz de dogurdan RecordType icindeki
        //amount un type i ne ise onu ver dogurdan demek istersek bu sekilde yapariz
        const IntlNfNO = new Intl.NumberFormat("no-NO", {
          style: "currency",
          currency: "NOK",
        }),
        Intl_NOK = (v:number) => IntlNfNO.format(v).replace("NOK", "kr");
        return <>{Intl_NOK(text)} </>
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: CategoryType, record: RecordType) => {
        const{type,color}=record.category;
        return <Tag color={color}>{type.toUpperCase()}</Tag>
      },
    },
    {//createdAt i biz datayi listelerken siralama, sortering icin kullanabiliriz
      title: "Last Update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string, record: RecordType) => {
       const dateWithYear=new Date(updatedAt).toISOString().substring(0,10);
       const dateWithTime=new Date(updatedAt).toISOString().substring(11,16);
       const dateLocalWithYear=new Date(updatedAt).toLocaleDateString();
       const dateLocalWithTime=new Date(updatedAt).toLocaleTimeString("no-NO", {hour:'2-digit',minute:'2-digit'});
        return <>{dateLocalWithYear + " "+ dateLocalWithTime}</>
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: (text:string,record:RecordType) => (//2 tane parametre var
    // 1.parametre o satirin o stununu parametresi
    // 2.parametre o satirin tamamnin veriyor
     
    <Space size="middle">
    <EditOutlined style={{color:"blue",cursor:"pointer"}} onClick={()=>{
      const {title,amount}=record;
      const category_id=record.category.id;
       showModal("edit");
     //  setForm({title:record.title,amount:record.amount,category_id:record.category.id});
       setForm({title,amount,category_id});
       SetUpdateId(record.id);
    }}/>
    <DeleteOutlined style={{color:"tomato",cursor:"pointer"}}  onClick={()=>{
      showModal("delete");
       SetDeleteId(record.id);

    }} />
  </Space>
      ),
    },
  ];

  //Tek bir fonksiyonu gelen parametreden 2 farkli
  //durum icin kullanacagiz....new butonuna basinca mode new olacak
  //edit butonuna basinca mode edit olacak
  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  //Ok e basinca calisan method
  //Burda biz moda gore new veya edit durumn na gore gerekli
  //action createor cagiririz
  //Islem tamam olunca da model i kapatacak
  const handleOk = (mode:Mode) => {
    if(mode==="new") dispatch(addRecord(form));
  else if(mode==="edit" && typeof updateId === "number") dispatch(updateRecord(form,updateId));
    else if(mode === "delete")dispatch(deleteRecord(deleteId as number));
    setIsModalVisible(false);
    setMode("new"); //default haline donduruyoruz
    setForm(initialRecordForm);
    SetUpdateId(null);//Burayi da default hale getiriyoruz
  };

  //Burasi da islemden vazgec ve kapat moddel i diyor
  //Ve burda biz modal statusu muzu basa dondurecegiz...
  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new"); //default haline donduruyoruz
    setForm(initialRecordForm);
    SetUpdateId(null);//Burayi da default hale getiriyoruz
    SetDeleteId(null);
  };

  return (
    <Fragment>
<div style={{display:"flex", justifyContent:"flex-end",marginBottom:"10px" }}>
        <Button type="primary" onClick={(e) => showModal("new")}>
          New Record
        </Button>
        <Modal
          title={mode == "new" ? "Create New Record" : mode==="edit" ? "Edit Record" : "Delete Record"}
          visible={isModalVisible}
          onOk={()=>handleOk(mode)}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !(mode === "delete") && !isFormValid }}
        >
          {mode === "edit" || mode === "new" ? 
           <Form name="basic" labelCol={{ span: 8 }}>
           <Form.Item label="Record Title">
             <Input
               name="title"
               value={title}
               onChange={(e) =>
                 setForm({ ...form, [e.target.name]: e.target.value })
               }
             />
           </Form.Item>
           <Form.Item label="Amount ">
             <Input
               name="amount"
               value={amount}
               onChange={(e) =>
                 setForm({ ...form, [e.target.name]: Number(e.target.value) })
               }
             />
           </Form.Item>
           <Form.Item label="Category">
             <Select
               defaultValue={category_id}//burdan default 0 gelecek
               value={category_id}
               onChange={(category_id) =>
                 setForm({ ...form, category_id:Number(category_id)  })
               }
             >
               <Select.Option value={category_id} disabled>Select a category</Select.Option>
                {/* Baslangicta kullaniciya gozukecek Select a category diye ama kullanici seceneklere
                bakacagiz zaman seceneklerde bu secenegi goremeycek ve de secemeyecek disable yaptigmiz icin */}
                {/*Alttaki option da category dizimizi, listeleyecek dinamik bir sekkilde... */}
             {categories.map((category,index)=>(
                <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
             ))}

             </Select>
           </Form.Item>
          
         </Form>
          : mode==="delete" ? <>Are you sure?</>: null }
         
        </Modal>
      </div>
      <Table loading={loading} columns={columns} dataSource={data} rowKey="id" />
      {/* rowKey e bu compnent icinde hangi data yi kullaniyor isek ve o data icinde uniq olarak kullanilan
      proeprty ismi ne ise onu buraya veririz... */}
    </Fragment>
   
  )
}

export default Records

