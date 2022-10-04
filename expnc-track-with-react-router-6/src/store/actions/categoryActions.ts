
import { CategoryType, CategoryDispatch, CategoryForm } from '../../types/category';
import api from '../../utils/api';
export const getCategories=()=>async (dispatch:CategoryDispatch)=>{
    dispatch({
        type:"GET_CATEGORIES_START",
    });
    try {
        const response=await  api().get<CategoryType[]>("/categories");
        dispatch({type:"GET_CATEGORIES_SUCCESS",payload:response.data}) 
    } catch (error) {
        dispatch({type:"GET_CATEGORIES_ERROR"});
    }
}

export const addCategory=(form:CategoryForm)=>async (dispatch:CategoryDispatch)=>{
         dispatch({type:"ADD_CATEGORY_START"});
    try {
        const response=await api().post<CategoryType>("/categories",form);
        //Yeni bir kategori ekledigmizde bize gelen deger CategoryType inda bir objedir
        //bunu belirtmemiz gerekiyor typescriptte
        dispatch({type:"ADD_CATEGORY_SUCCESS",payload:response.data})
    } catch  {
        dispatch({type:"ADD_CATEGORY_ERROR"})
    }
}

export const updateCategory=(form:Partial<CategoryForm>,categoryId:number)=>async (dispatch:CategoryDispatch)=>{
         dispatch({type:"UPDATE_CATEGORY_START"});
         try {
            const response=await api().put<CategoryType>(`/categories/${categoryId}`,form);
            dispatch({type:"UPDATE_CATEGORY_SUCCESS",payload:response.data});
         } catch  {
            dispatch({type:"UPDATE_CATEGORY_ERROR"});
         }   
}

export const deleteCategory=(id:number)=>async (dispatch:CategoryDispatch)=>{
            dispatch({type:"DELETE_CATEGORY_START"});
            try {
                await api().delete(`/categories/${id}`);
                //Herhangib birdeger donmeigi icin donus type i yazmamiza da gerek yok
                dispatch({type:"DELETE_CATEGORY_SUCCESS",payload:id})
            } catch  {
                dispatch({type:"DELETE_CATEGORY_ERROR"});
            }
}