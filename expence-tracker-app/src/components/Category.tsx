import { Button, Form, Input, Modal, Select, Space, Spin, Table, Tag } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CategoryDispatch,
  CategoryForm,
  CategoryType,
} from "../types/category";
import { AppState } from "../store/index";
import { getCategories, addCategory, updateCategory, deleteCategory } from '../store/actions/categoryActions';
import { SketchPicker } from "react-color";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Mode } from "../types/general";
import { useLocation } from 'react-router-dom';



const initialCategoryForm: CategoryForm = {
  name: "",
  type: "expense",
  color: "black",
};


interface locStateType {
  from:string;
}

const Category = () => {
  const location=useLocation();
  const from=(location.state as locStateType)?.from;
  //console.log("from: ",from);//Burasi eger bu comonente Link yolu ile
  //AppHeader componentinden menu butonuna tiklanarak gelirse from
  //degiskeni dolu olacak yoksa bos oalcak bu sayede biz AppHeaderdan
  //Categories linkine tiklandigini anlayacagiz ve de ordan gelince burda bir render
  //olussun istiyoruz

  useEffect(()=>{
  },[from])
  
  const[categoryUpdateId,SetCategoryUpdateId]=useState<number | null>(null);
  const[categoryDeleteId,SetCategoryDeleteId]=useState<number | null>(null);
  //annot redeclare block-scoped variable 'data'.ts(2451)-const ile deklere edilmis
  //bir datayi bir kez daha deklere edemezsin
  const { data, loading, error } = useSelector(
    (state: AppState) => state.categories
  );
  console.log("categories", data);

  const [form, setForm] = useState<CategoryForm>(initialCategoryForm);
  const { name, type,color } = form;
  const dispatch = useDispatch<CategoryDispatch>();

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: text => <a>{text}</a>,
      //categorinin ismini link olarak gostermis, onun icinde render yapiyor
      //Ama biz oyle yapmayacagiz ondan dolayi render lari silebiliriz..
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string, category: CategoryType) => (
        <>
          <Tag color={category.color} key={category.id}>
            {text?.toUpperCase()}
          </Tag>
        </>
      ),
    },

    {
      title: 'Action',
      key: 'action',
      render: (text:string,category:CategoryType) => (//2 tane parametre var
    // 1.parametre o satirin o stununu parametresi
    // 2.parametre o satirin tamamnin veriyor
     
        <Space size="middle">
          
          <EditOutlined style={{color:"blue",cursor:"pointer"}} onClick={()=>{
            showModal("edit");
            setForm(category);
            SetCategoryUpdateId(category.id);
            //BESTPRACTISE..
    //dinamik id  ye bizim edit formunu gonderirken ihtiyacimiz var ama biz butona tiklama isini disarda yapiyoruz
    //Yani biz dinamik id yi, ornegin listelene data icinde aliyoruz ama
    //en son update etme butonu olan Ok butonuna bu listenin disinda modal,da pop-up da basiyoruz...
    //Peki nasil olacak burda bizim o anki tikladgimiz id numarasini disardaki
    //Ok butonu methoduna gonderecegiz, handleOk ye BESTPRACTISE--
    //Hemen 1 tane categoryUpdateId isminde state olustururuz
    // const[categoryUpdateId,SetCategoryUpdateId]=useState<number | null>(null);
    //Sonra id yi listeleme icinde ki update butonu icinde dinamik olarak
    //state e atadiktan sonra artik istedgimz yerde kullanabiliriz.....
          }}/>
          <DeleteOutlined style={{color:"tomato",cursor:"pointer"}}  onClick={()=>{
            showModal("delete");
            SetCategoryDeleteId(category.id);
            //Yine burda da dinamik olarak tiklanan id yi disariya aktarmamiz gerekiyor
            //Bunun icinde deleteId state i olusturup ona id yi aktariyoruz ve artik
            //dinamik olan di yi disarda kullanabiliriz.
          }} />
        </Space>
      ),
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");

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
   if(mode==="new") dispatch(addCategory(form));
 //  if(mode==="edit") dispatch(updateCategory(form,categoryUpdateId as number))
  else if(mode==="edit" && typeof categoryUpdateId === "number") dispatch(updateCategory(form,categoryUpdateId));
    //Mode degerine gore create or update actioncreateor func invoke
    else if(mode === "delete")dispatch(deleteCategory(categoryDeleteId as number));
    setIsModalVisible(false);
    setMode("new"); //default haline donduruyoruz
    setForm(initialCategoryForm);
    SetCategoryUpdateId(null);//Burayi da default hale getiriyoruz
  };

  //Burasi da islemden vazgec ve kapat moddel i diyor
  //Ve burda biz modal statusu muzu basa dondurecegiz...
  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new"); //default haline donduruyoruz
    setForm(initialCategoryForm);
    SetCategoryUpdateId(null);//Burayi da default hale getiriyoruz
    SetCategoryDeleteId(null);

  };
  return (
    <Fragment>
      <div style={{display:"flex", justifyContent:"flex-end",marginBottom:"10px" }}>
        <Button type="primary" onClick={(e) => showModal("new")}>
          New Category
        </Button>
        <Modal
          title={mode == "new" ? "Create New Category" : mode==="edit" ? "Edit Category" : "Delete Category"}
          visible={isModalVisible}
          onOk={()=>handleOk(mode)}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !name && mode==="new" ? true : false }}
        >
          {mode === "edit" || mode === "new" ? 
           <Form name="basic" labelCol={{ span: 8 }}>
           <Form.Item label="Category Name">
             <Input
               name="name"
               value={name}
               onChange={(e) =>
                 setForm({ ...form, [e.target.name]: e.target.value })
               }
             />
           </Form.Item>
           <Form.Item label="CategoryType">
             <Select
               defaultValue="expense"
               value={form.type}
               onChange={(type: "expense" | "income") =>
                 setForm({ ...form, type })
               }
             >
               <Select.Option value="expense">Expense</Select.Option>
               <Select.Option value="income">Income</Select.Option>
             </Select>
           </Form.Item>
           <Form.Item label="color">
             <SketchPicker
               color={color}
               onChange={(color) => setForm({ ...form, color: color.hex })}
             />
           </Form.Item>
         </Form>
          : mode==="delete" ? <>Are you sure?</>: null }
         
        </Modal>
      </div>
      <Table loading={loading} columns={columns} dataSource={data} rowKey="id" />;
    </Fragment>
  );
};

export default Category;
/*
 <Table columns={columns} dataSource={data} />;
 Burda columns sutunlari olusturan yapidr
 data ise icinde gosterilen datadir.
*/
