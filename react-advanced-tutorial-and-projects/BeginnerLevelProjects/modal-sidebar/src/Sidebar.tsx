import {useState} from "react";


const Sidebar = () => {
const [isSidebarOpen,setIsSidebarOpen]=useState<boolean>(false);
   console.log("isSidebarOpen: ",isSidebarOpen)
  return (
    <>
    <div className="menu">
      <span className="icon-menu"
      onClick={()=>setIsSidebarOpen(true)}
      ></span>
    </div>
    <aside className="aside"
    /*
sidebarimiz normal olusturyoruz ve sidebari kapsayan aside elemtnin 
transform:translateX(-100%) ile sola gonderyoruz biz kulllanici olarak onu gormuyoruz ama o solda bekliyor...Evet transition efektini alabilmemizi icin hareket olmasi gerekiyor yani true false ile display none veya true ise bu elemnti goster yoksa gosterme mantigi ile transition efekti alamayiz transition efekti alabilmek icin o elementi bizim kaybetmek yerine onu ekranda gorunmeyecek sekilde ve hareket ettirecek sekilde width,height,position:absolute,left:-100,transform:translate,opactity gibi ozellklerini kullanarak,
elementi ekrandan uzak biryere gonderip sonra da true-false mantiginda true oldugunda yani kullanici istenilen yere tikladiginda da o elemnntin style ini ekranda gorunecek sekilde degistirirsek o element onu tuttugmz yerden efektli bir sekilde gelecektir...
*/
    style={{transform:`${isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)'}`}}
    >
        <section className="sidebar-top">
        <span className="sidebar-title">Codding Addict</span>
        <span className="icon-cross"
        onClick={()=>setIsSidebarOpen(false)}
        ></span>
        </section>
        <nav className="nav">
        <section className="nav-item home">
        <span className="icon-home"></span>
            <span>home</span>
        </section>
        <section className="nav-item users">
        <span className="icon-users"></span>
            <span>team</span>
        </section>
        <section className="nav-item projects">
        <span className="icon-folder-open"></span>
            <span>projects</span>
        </section>
        <section className="nav-item calendar">
        <span className="icon-calendar"></span>
            <span>calendar</span>
        </section>
        <section className="nav-item documents">
        <span className="icon-file-text"></span>
            <span>documents</span>
        </section>
        </nav>
{/*
position: absolute; width: 0; height: 0; overflow: hidden;
 */}
        
    </aside>
    </>
  );
};

export default Sidebar;
