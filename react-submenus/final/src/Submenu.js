import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "./context";

const Submenu = () => {
  const { isSubmenuOpen,page: { page, links },location,} = useGlobalContext();
  //Navbar da ana menu uzerine mouse ile gezinti yapildigi anda biz onMouseOver uzerinden,
  // uzerinden gezinti yapilan ana menu elementi page i ve subMenuleri icinde barindiran objedir, aktif objedir
  //,uzerinde gezinilen ana menu elemntini 
  //location degerleri(center,bottom) ve de isSubMenuOpen ile subMenu nun acilip kapanmasini 
  //saglayan degeri context ten guncel birsekilde aliyoruz
  const container = useRef(null);
  //Tum submenu yu icine alan kutuya dom dan erismek icin useRef uzerindne hareket ettik burda da...
  const [columns, setColumns] = useState("col-2");
  //Burda da lokal bir state tutarak biz ,ana menu elementlerinin submenu elemntleri 
  //degsken oluyor kimisi fazla kimisi eksik ve biz istiyoruz ki subMenu icin olstudugmzu
  // kutucugun standart bir boyutt olsun en dusugunden ama ornegin subMenu eleman sayisi 
  //artan ana menu elemanlarinda ona gore subMenu kutucuugu otomatik buyusun istiyrouz 
  //iste o islem icinde columns,setColumsn useSate ti tutacagiz
  useEffect(() => {
    setColumns("col-2");
    const submenu = container.current;//Bu SubMenuyu temsil eden elemnt iste..
    const { center, bottom } = location;
    //Burdan guncel center,bottom degerini aliriz uzerinde gezinilen elemanin
    submenu.style.left = `${center}px`;
    //ana menunun center i yani ortasindan diyor left olsun diye
    //left demek kendi widthine gore basladigi 0 noktasindan yani ensolu yani submenu en solundan tutuyor center
    submenu.style.top = `${bottom}px`;
    console.log(links);
    if (links.length === 3) {
      setColumns("col-3");
    }
    if (links.length > 3) {
      setColumns("col-4");
    }
  }, [page, location, links]);
  return (
    <aside
      className={`${isSubmenuOpen ? "submenu show" : "submenu"}`}
      ref={container}
    >
      <section>
        <h4>{page}</h4>
        <div className={`submenu-center ${columns}`}>
          {links.map((link, index) => {
            const { url, icon, label } = link;
            return (
              <a key={index} href={url}>
                {icon}
                {label}
              </a>
            );
          })}
        </div>
      </section>
    </aside>
  );
};

export default Submenu;
/*
SubMenu de tam olarak ne yapiliyor ona bakalim simdi de...
Bize Navbar dan gelen o an icin uzerinde gezinilen ana menu elemaninin
ismi ve submenu lerini icinde barindiridigi aktif obje yi aliriz ve ayni zamanda
uzerinde gezinilen elemanin center degeri ve bottoom degeri alinir ve bunlar
subMenu kutusunu yerlestirirken dogru yerlestirmek iicn ve dinamik birsekkilde yerlestirmek
icin kullanilir ve ayrica da subMenu nun eleman syaisina gore de buyumesi icin,bir
logic olusturluyor

*/
