import React from 'react'
import { DeveloperType, useTabContext } from '../context/TabContext'

const DeveloperList = ({developers,isSuccess}:DeveloperListProps) => {

  const {  activeDeveloper, setActiveDeveloper } =useTabContext();
  console.log("activeDeveloper: ",activeDeveloper);
  return (
  <>
   <section className="dev-Names">
          <ul className="dev-Names__ul">  
          {isSuccess && developers?.map((item:DeveloperType)=>(
            <li key={item.id}
            onClick={()=>setActiveDeveloper(item)}
            className={`${activeDeveloper.company===item.company ? 'active' : ''}`}
            >{item.company}</li>
          ))}
          </ul>
      </section>
  </>
  )
}

/*Data uzak apiden geldigi icin, ilk anda undefined olarak gelecek
daha sonra, data gelecek dolayisi ile data undefined type ve normal
DeveloperType i da almis olacak */
interface DeveloperListProps {
  developers:DeveloperType[] | undefined;
  isLoading:boolean;
  isSuccess:boolean;
}

DeveloperList.defaultProps={
  developerList:[],
}

export default DeveloperList

/*
Burda biz aktif tiklanan
developer i alabiliyoruz, merkezi olarak datalarimzi
tuittugmuz, context ten getirdigmiz activDeveloper,setActiveDeveloper da
biz, bu islemi yaparak aktif developer i merkezi noktadan almis olacagiz
Sonra da hangi componentte aktif developer i gosterecek isek 
orda da aktif developer i gosterecegiz....

*/