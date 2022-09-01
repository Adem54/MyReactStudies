import React from 'react';
import logo from './images/logo.svg';
import { FaBars } from 'react-icons/fa';
import { useGlobalContext } from './context';

const Navbar = () => {
  const { openSidebar, openSubmenu, closeSubmenu } = useGlobalContext();
  const displaySubmenu = (e) => {
    const page = e.target.textContent;
    console.log("page:",page);//hangi menu elemani uzerine gidilirse onu veriyor
    const tempBtn = e.target.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2 ;
    console.log("center: ",center);
    //center burda her bir menu elemaninin kendi tam ortasina gelelecek sekilde bir ok ile onu isaret ederken tam ortadan isaret etmesi icin kullanilyor..yani sub menu her bir ana menu elemani ustune gidince onun altina gelecek sekilde ayarlaniyor ve de o menu elemanini submenu kutucuugu en ustunde isaret ediyor...ucgen seklinde..iste o her bir ana menunun tam ortasina gelecek sekilde yerlesmesini istiyoruz ondan da dolayi left,right ini alip 2 ye boluyoruz bu left ve right toplayip 2 ye bolme bize uzerine geligmiz elemanini ortasina gelecek koordinati verir
    const bottom = tempBtn.bottom -3;
    //biraz daha sub menu yu yukari cikariyoruz burda aslinda
    openSubmenu(page, { center, bottom });
    //bu sub menunun acilmasini ve de koordinat olarak da center ve bottom un verilmesini sagliyor..
  };
  const handleSubmenu = (e) => {
    if (!e.target.classList.contains('link-btn')) {
      //class icinde link-btn  yi barindirmiyor ise o zaman
      //closeSubmenu ile kapaniyor subMenu, bu da nav kapsyacisindan ciktigmiz aman false yaparak sub menuleri kapatiyoruz aslinda... 
      closeSubmenu();
    }
  };
  return (
    <nav className='nav' onMouseOver={handleSubmenu}>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={logo} className='nav-logo' alt='' />
          <button className='btn toggle-btn' onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className='nav-links'>
          <li>
            <button className='link-btn' onMouseOver={displaySubmenu}>
              products
            </button>
          </li>
          <li>
            <button className='link-btn' onMouseOver={displaySubmenu}>
              developers
            </button>
          </li>
          <li>
            <button className='link-btn' onMouseOver={displaySubmenu}>
              company
            </button>
          </li>
        </ul>
        <button className='btn signin-btn'>Sign in</button>
      </div>
    </nav>
  );
};

export default Navbar;
/*
 Ana menu elemanlari uzerinde gezinirken react uzerinden onMousOver ile yapilan islem sudur aslinda mantik oalrak
 1-Sub menunun acilmasini saglamak, 
 2-Uzerine gelinen menu elemanin hangisi ise onu guncel bir sekiklde tum state ti tuggugmuz container da guncelleyerek submenu uzerinde ihtiaycimz oldugunda dogrudan o an uzerinden olan elemente erismis olacagiz
 3-Uzerinde gezindigmiz elemenin center ortasi(right-left)/2 ile bulunan, ve bottom degerlerini guncel oalrak surekli olarak yine container uzerineki location dgerinde tutmak ve subMenu de ihtiyacimz oldugunda kullanabilmek
 4-Ana menu yu icine alan element hangisi ise ondan mouse olarak ciktimiz zaman subMenuyu kapatmak...burda da harika bir besptactise durumu var..... 
 */