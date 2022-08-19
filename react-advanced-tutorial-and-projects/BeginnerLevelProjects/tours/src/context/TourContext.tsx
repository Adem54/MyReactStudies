import {
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";
//children type=>ReactNode veya ReactElement dir...


export interface Tour {
  id: string;
  name: string;
  info: string;
  image: string;
  price: string;
}


export interface TourContextType {
data:Tour[];
setData:React.Dispatch<React.SetStateAction<Tour[]>>,
removeTour:(id:string)=>void;
showMore:boolean;
setShowMore:React.Dispatch<React.SetStateAction<boolean>>,
refresh:()=>void;
}

interface ContextProviderProps {
  children: ReactElement;
}



export const TourContext = createContext<TourContextType>({} as TourContextType);

export const TourContextProvider:React.FC<ContextProviderProps> = ({ children }) => {
  const [data,setData]=useState<Tour[]>([] as Tour[]);
  const [showMore,setShowMore]=useState<boolean>(false);

  const removeTour=(id:string)=>{
    if(id){
      setData(data.filter(tour=>tour.id!==id.toString()))
    }
  }

  const refresh=()=>{

  }

  const values:TourContextType = {data,setData,showMore,setShowMore,removeTour,refresh} as TourContextType;
  return <TourContext.Provider value={values}>{children}</TourContext.Provider>;
};

//Sunu bir anlayalim...Bu bizim genellestiriip globallestirip uygulamanin ihtiyacim olan her yerinde kullanabilecegim bir
//islem doolayisi ile bir degisken degil, useContext kendisi de bir
export const useTourContext = () => useContext(TourContext);
/*
Biz useContext i oyle dogrudna kullanamayiz cunku bir react hooks dur react hooklar direk kullanilmazlar bir fonksiyon icinde return edilmeleri gerekir
you have to call this const [state, useDispatch, provider] = useCreateContext(initialState, reducer); inside the function not outside you are breaking hooks rule. The way you are doing outside function it's wrong
*/
