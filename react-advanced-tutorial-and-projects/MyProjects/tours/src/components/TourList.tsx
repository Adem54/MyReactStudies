import { useEffect } from "react";
import { useQuery } from "react-query";
import { getTours } from "../api/tourApi";
import { Tour, useTourContext } from "../context/TourContext";
import axios from "axios";
import { Tour as TourComponent } from "./Tour";
import Loading from "./Loading";

const styles={marginBottom:"4rem",}
const TourList = () => {
  const {
    data: tours,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery<Tour[]>("query-tours", getTours);
  const { showMore, setShowMore, setData, data, removeTour } = useTourContext();

  
  /* data yi useQuery den getirdik ve optimistik data ya gore isSuccess e guvendik
    o zaman data api den gelmistir dedik ve lokal state timize aldik datayi ve biz kullanciya datayi
    lokal state timizden gosteriyoruz..
    */
  useEffect(() => {
    if (isSuccess) {
      setData(tours);
    } else {
      console.log("No data");
    }
  }, [isSuccess, tours, setData]);


  let content;

  if (isLoading) {
    content = <Loading/>;
  } else if (isSuccess && data.length>0) {

    content = (
      <>
      <h1 className="main-title">Our Tours</h1>
        {" "}
        <section  style={styles}>  
        {data?.map((tour) => (
     
          <TourComponent key={tour.id}  data={tour} />
         
        ))}
      </section>
    
      </>
    );
  }else if(isSuccess && data.length===0){
    console.log("data.length ve isSuccess e giriyor.....")
    content=<>
    <h1 className="main-title">No Tours Left</h1>
    <button className="btn refresh-btn" onClick={()=>{
        setData(tours);
    }}>Refresh</button>
    </>
  }

  return (
    <div>
     {content}
    </div>
  );
};

export default TourList;
/*
Burda onemli bir nokta var isLoading ile data nin hepsinin silindigi zamanki durumu birbirinden biz
biz useQuery den gelen isLoading ile ayirt edecegiz...
*/