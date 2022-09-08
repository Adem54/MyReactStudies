import { useEffect } from 'react';
import { useTabContext } from '../context/TabContext';


const Developer = ({isLoading}:{isLoading:boolean}) => {

  const {developers,  activeDeveloper, setActiveDeveloper } =useTabContext();
  const {title,dates,duties,company}=activeDeveloper;
 
 useEffect(()=>{
    if(developers.length>0){
      
      setActiveDeveloper(developers[0]);
    }
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[developers])
  return (
  <>
   <section className="dev-detail">
        <section className="container">
        <p className="dev-title">{title  }</p>
        <p className="dev-name">{company }</p>
        <p className="dev-date">{dates }</p>
        <article className="duties">
          <ul className="dev-duty-ul">
          {duties?.map((item:string,index:number)=>(
            <li key={index} >{item} </li>
          )) }
          </ul>
        </article>
        </section>
      
      </section>
  </>
  )
}

export default Developer