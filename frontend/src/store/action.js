import axios from "axios";

export const GET_MENU = "GET_MENU";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";

const filterList = (data) => {
  let menu = [];
  const set = new Set("");
  data?.forEach((item) => set.add(item.category));
  const categories = Array.from(set);
  categories.forEach((category) => {
    let temp = [];
    data?.forEach((item) => {
      if (item.category === category) {
        temp?.push(item);
      }
    });
    menu.push(temp);
  });
  return menu;
};

export const getMenu = () => async (dispatch) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const res = await axios.get(`${url}/user/loadmenu`);
    dispatch({
      type: GET_MENU,
      payload: filterList(res.data),
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const addToCart = (item) => (dispatch) => {
  dispatch({ type: ADD_TO_CART, payload: item });
};

export const removeFromCart = (id) => (dispatch) => {
  dispatch({ type: REMOVE_FROM_CART, payload: id });
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: CLEAR_CART });
};
