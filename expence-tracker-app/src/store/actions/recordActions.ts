import { RecordDispatch, RecordForm, RecordType } from "../../types/record";
import api from "../../utils/api";

export const getRecords=()=>async (dispatch:RecordDispatch)=>{
    dispatch({type:"GET_RECORDS_START"});
    try {
        const response=await api().get<RecordType[]>("/records");
        // response.data.sort((a,b)=>b.id - a.id);
        response.data.sort((a:RecordType,b:RecordType)=> {
            return new Date(b.createdAt).getTime()- new Date(a.createdAt).getTime();
        })
        dispatch({type:"GET_RECORDS_SUCCESS",payload:response.data});
    } catch  {
        dispatch({type:"GET_RECORDS_ERROR"});
    }
}


export const addRecord=(form:RecordForm)=>async (dispatch:RecordDispatch)=>{
    dispatch({type:"ADD_RECORD_START"})
    try {
          const response=await api().post<RecordType>("/records",form);
          dispatch({type:"ADD_RECORD_SUCCESS",payload:response.data})  
    } catch  {
        dispatch({type:"ADD_RECORD_ERROR"});
    }
};
//{title:"April"}
export const updateRecord=(form:Partial<RecordForm>,id:RecordType['id'])=> async (dispatch:RecordDispatch)=>
{
        dispatch({type:"UPDATE_RECORD_START"});
        try {
            const response=await api().put<RecordType>(`/records/${id}`, form);
            dispatch({type:"UPDATE_RECORD_SUCCESS",payload:response.data});
        } catch  {
            dispatch({type:"UPDATE_RECORD_ERROR"});
        }
};

export const deleteRecord=(id:RecordType['id'])=>async (dispatch:RecordDispatch)=>
{
    dispatch({type:"DELETE_RECORD_START"});
    try {
        const response=await api().delete<any>(`/records/${id}`);
        dispatch({type:"DELETE_RECORD_SUCCESS",payload:id})
    } catch  {
        dispatch({type:"DELETE_RECORD_ERROR"});
    }
};