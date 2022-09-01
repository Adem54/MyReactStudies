import React, { useState, useContext } from 'react';
import sublinks from './data';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  //submenu acilip kapanma islemini yonetiyoruz burdan,uzerine gelince onMouseOver da subMenu acilacak
  const [page, setPage] = useState({ page: '', links: [] });
  //submenu datasini tutuyoruz burda
  const [location, setLocation] = useState({});
  //Burasi da biz subMenuyu dinamik olarak kullanaagiz her bir menu elemni uzerine gelince uzerine gittimigz ana menu elemaninin konumuna gore, left, right ve bottom uzerinden yani left-right i toplayip bir center degeri ve bottom kullanarak her bir submenu yu menu elemanlarina gore ortalama islemini yapaagiz..
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  //Bursasi onemli, bu openSubmenu fonksiyonu, parametresine text olarak, hangi ana menu elementi var ise onu aliyor ve de coordinates icin ise o uzerne geldigmiz ana menu elemanina ait center ve bottom degerinin barindiran coordinates objesni aliyor
  const openSubmenu = (text, coordinates) => {
    const page = sublinks.find((link) => link.page === text);
    //Elimzdeki data uzerinden bize gelen ana menu elmanina ait objeyi alip, hangisini uzerine gelinmis ise onu uzerine gelindigi anda, onu guncelleriz setPage ile page e atariz dolayisi ile de kullanici hangi menu elemanina gelirse onu surekli guncel olarak almis oluruz
    setPage(page);
    //uzerine geline sayfaya ait objeyi buluyor o an icin hangi nav menusunn ustune gelinmis ise dinamiik olarak sureklki onu aliyor
    setLocation(coordinates);
    //Burda yine uzerine gelinen elemanin coordinatlarini almiss oluyoruz...
    setIsSubmenuOpen(true);
    //Uzerine gelindidigi anda subMenunun acilmasin sagalaycak olan isSubmenuOpen derini true yapariz..
  };
  /*
  Kisacasi openSubmenu fonksiyonu, o an uzerine gelinen menu elemanini guncelleyip page e setPage uzerinden aktarmamizi, uzerine gelinen menu elemanina ait, center ve bottom degerini guncel birsekilsekilde setLocation uzerinden location a aktarmmizii, ve son olarak da subMenunun acilmasini saglayan islevleri yerine getiren bir fonksiyondur...
  */
  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        isSubmenuOpen,
        openSubmenu,
        closeSubmenu,
        page,
        location,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
