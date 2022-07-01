import { CategoryType } from "./category";
import { ThunkDispatch } from "redux-thunk";

export interface RecordType {
  id: number;
  title: string;
  amount: number;
  createdAt: string;
  updatedAt: StaticRangeInit;
  category: CategoryType;
}

export interface RecordState {
  data: RecordType[];
  loading: boolean;
  error: string;
}

export interface RecordForm {
  title: string;
  amount: number;
  category_id: CategoryType["id"];
}
//category_id must be a valid entry ID in the category table.
//Category_id yi zaten redux statetindeki category den alacagiz..

export interface GET_START {
  type: "GET_RECORDS_START";
}
export interface GET_SUCCESS {
  type: "GET_RECORDS_SUCCESS";
  payload: RecordType[];
}

export interface GET_ERROR {
  type: "GET_RECORDS_ERROR";
}

export interface ADD_START {
  type: "ADD_RECORD_START";
}
export interface ADD_SUCCESS {
  type: "ADD_RECORD_SUCCESS";
  payload: RecordType;
}
export interface ADD_ERROR {
  type: "ADD_RECORD_ERROR";
}
export interface UPDATE_START {
  type: "UPDATE_RECORD_START";
}
export interface UPDATE_SUCCESS {
  type: "UPDATE_RECORD_SUCCESS";
  payload: RecordType;
}
export interface UPDATE_ERROR {
  type: "UPDATE_RECORD_ERROR";
}
export interface DELETE_START {
  type: "DELETE_RECORD_START";
}
export interface DELETE_SUCCESS {
  type: "DELETE_RECORD_SUCCESS";
  payload: number;
}
export interface DELETE_ERROR {
  type: "DELETE_RECORD_ERROR";
}

export type RecordAction =
  | GET_START
  | GET_SUCCESS
  | GET_ERROR
  | ADD_START
  | ADD_SUCCESS
  | ADD_ERROR
  | UPDATE_START
  | UPDATE_SUCCESS
  | UPDATE_ERROR
  | DELETE_START
  | DELETE_SUCCESS
  | DELETE_ERROR;
export type RecordDispatch = ThunkDispatch<RecordState, void, RecordAction>;
