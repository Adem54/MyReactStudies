import { RecordAction, RecordState, RecordType } from "../../types/record";

const initialState = {
  data: [] as RecordType[],
  loading: false,
  error: "",
};

const recordReducer = (
  state: RecordState = initialState,
  action: RecordAction
) => {
  switch (action.type) {
    case "GET_RECORDS_START":
      return { ...state, loading: true, error: "" };
    case "GET_RECORDS_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "GET_RECORDS_ERROR":
      return { ...state, loading: false, error: "Get records request failed" };
    case "ADD_RECORD_START":
      return { ...state, loading: true, error: "" };
    case "ADD_RECORD_SUCCESS":
      return { ...state, loading: false, data: [...state.data,action.payload] };
    case "ADD_RECORD_ERROR":
      return { ...state, loading: false, error: "Add record request failed" };
    case "UPDATE_RECORD_START":
      return {...state,loading:true,error:""}
    case "UPDATE_RECORD_SUCCESS":
      return {...state,loading:false,data:state.data.map(record=>record.id===action.payload.id ? action.payload : record)};
    case "UPDATE_RECORD_ERROR":
      return {...state,loading:false,error:"Update record request failed"}      
    case "DELETE_RECORD_START":
      return {...state,loading:true,error:""}
    case "DELETE_RECORD_SUCCESS": 
      return {loading:false, data:state.data.filter(record=>record.id!==action.payload)};
    case "DELETE_RECORD_ERROR":
      return {...state,loading:false,error:"Delete record request failed"}     
    default:
      return state;
  }
};

export default recordReducer;
