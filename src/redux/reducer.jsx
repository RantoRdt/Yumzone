const initialState = {
  menus: [],
  menusLoading: false,
  menusError: false,

  sales: [],
  salesLoading: false,
  salesError: false,

  orders: {
    past: [],
    current: []
  },
  ordersLoading: false,
  ordersError: false,

  userInfo: {
    messages: []
  },

  restInfo: {
    schedule: []
  },
  restInfoLoading: false,
  restInfoError: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MENUS_START":
      return {...state, menusLoading: true, menusError: false }
    case "FETCH_MENUS_FAIL":
      return {...state, menusLoading: false, menusError: true }
    case "FETCH_MENUS_SUCCESS":
      return { ...state, menus: action.payload.menus, menusLoading: false, menusError: false };
      
    case "FETCH_ORDERS_START":
      return {...state, ordersLoading: true, ordersError: false }
    case "FETCH_ORDERS_FAIL":
      return {...state, ordersLoading: false, ordersError: true }
    case "FETCH_ORDERS_SUCCESS":
      return { ...state, orders: action.payload.orders, ordersLoading: false, ordersError: false };    

    case "FETCH_USERINFO":
      return { ...state, userInfo: action.payload.userInfo };

    case "FETCH_RESTINFO_START":
      return {...state, restInfoLoading: true, restInfoError: false }
    case "FETCH_RESTINFO_FAIL":
      return {...state, restInfoLoading: false, restInfoError: true }
    case "FETCH_RESTINFO_SUCCESS":
      return { ...state, restInfo: action.payload.restInfo, restInfoLoading: false, restInfoError: false };

    case "FETCH_SALES_START":
      return {...state, salesLoading: true, salesError: false }
    case "FETCH_SALES_FAIL":
      return {...state, salesLoading: false, salesError: true }
    case "FETCH_SALES_SUCCESS":
      return { ...state, sales: action.payload.sales, salesLoading: false, salesError: false };

    default:
      return state;
  }
}

export default reducer