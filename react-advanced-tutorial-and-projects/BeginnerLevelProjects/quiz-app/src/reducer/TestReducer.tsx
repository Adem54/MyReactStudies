import React from "react";
const { useReducer } = React;

export interface HelloState {
  title: string;
}

export type Action =
  | { type: "SET_TITLE"; payload: string }
  | { type: "CLEAR_TITLE" };

export const initialState: HelloState = {
  title: "CodeSandbox",
};

export function reducer(state: HelloState, action: Action): HelloState {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "CLEAR_TITLE":
      return { ...state, title: "" };
    default:
      return state;
  }
}

const TestReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h1>Hello {state.title}</h1>
      <input
        value={state.title}
        onChange={(e) => {
          dispatch({ type: "SET_TITLE", payload: e.target.value });
        }}
      />
      <button
        onClick={() => {
          dispatch({ type: "CLEAR_TITLE" });
        }}
      >
        clear
      </button>
    </>
  );
};

export default TestReducer;
