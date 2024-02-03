import { ADD_TO_CART, CLEAR_CART, GET_MENU, REMOVE_FROM_CART } from "./action";

const initialState = {
  menu: [],
  cart: {},
  total: 0,
};

export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MENU:
      return { ...state, menu: action.payload };
    case ADD_TO_CART: {
      let item = action.payload;
      let curr = state.cart[item._id];
      if (curr) {
        return {
          ...state,
          cart: { ...state.cart, [item._id]: { ...curr, qty: curr.qty + 1 } },
          total: state.total + parseInt(item.price),
        };
      } else {
        return {
          ...state,
          cart: { ...state.cart, [item._id]: { ...item, qty: 1 } },
          total: state.total + parseInt(item.price),
        };
      }
    }
    case REMOVE_FROM_CART: {
      var id = action.payload;
      var newTotal = 0;
      var curr = Object.assign({}, state.cart);
      curr[id] = Object.assign({}, state.cart[id]);
      if (curr[id].qty > 1) {
        curr[id].qty = curr[id].qty - 1;
        newTotal = state.total - curr[id].price;
      } else {
        newTotal = state.total - curr[id].price;
        delete curr[id];
      }

      return { ...state, cart: curr, total: newTotal };
    }

    case CLEAR_CART:
      return { ...state, cart: {}, total: 0 };

    default:
      return state;
  }
};
