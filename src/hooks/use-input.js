import { useReducer } from "react";

const initState = {
  value: "",
  touched: false,
};

const stateReducer = (state, action) => {
  if (action.type === "CHANGE") {
    return { ...state, value: action.value };
  } else if (action.type === "BLUR") {
    return { ...state, touched: true };
  }
};

const useInput = (validate) => {
  const [state, dispatch] = useReducer(stateReducer, initState);
  const valid = validate(state.value);
  const onChanged = (e) => {
    dispatch({ type: "CHANGE", value: e.target.value });
  };
  const onBlur = (e) => {
    dispatch({ type: "BLUR" });
  };
  const error = !valid && state.touched;
  return { value: state.value, valid, error, onChanged, onBlur };
};

export default useInput;
