import { User } from "../components/user.model";

export  const getLastTenElementsInArray = (array:User[]) => {
    return array.filter((item, index) => {
     let lastElementIndex = array.length - 1;
     if (index > lastElementIndex - 10) {
       return item;
     }
   });
 };