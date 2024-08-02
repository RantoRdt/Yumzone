import { getDishes, getOrders, getRestInfo, getSales, getUserInfos } from "../API/axios"

export const fetchMenus = () => {
  return async dispatch =>{
    dispatch({ type: "FETCH_MENUS_START" })
    try {
      //const dataFixture = [{ id: 1, category: "Pizza", name: "Fromage", img: "/images/menu/pizza_frmg.avif", price: 3.99 , has_pork: false },{ id: 2, category: "Burger", name: "Extra" , img: "/images/menu/burger_extra.jpg", price: 5.99 , has_pork: true },{ id: 3, category: "Pizza", name: "Fruits de mer" , img: "/images/menu/pizza-aux-fruits-de-mer.jpg", price: 4.00, has_pork: false },{ id: 4, category: "Pizza", name: "4 saisons" , img: "/images/menu/pizza-4-saisons.avif", price: 4.49 , has_pork: false },{ id: 5, category: "Burger", name: "Mini" , img: "/images/menu/burger-mini.jpg", price: 3.00 , has_pork: true },{ id: 6, category: "Tacos", name: "Max" , img: "/images/menu/burger-mini.jpg", price: 2.59 , has_pork: false },{ id: 7, category: "Pizza", name: "Mini" , img: "/images/menu/burger-mini.jpg", price: 5.49 , has_pork: true },{ id: 8, category: "Pizza", name: "Maxi" , img: "/images/menu/burger-mini.jpg", price: 6.99 , has_pork: true }]
      const { data: menus } = await getDishes()
      dispatch({ type: "FETCH_MENUS_SUCCESS", payload: { menus }})
    } catch (error) {
      console.error(error)
      dispatch({ type: "FETCH_MENUS_FAIL" })
    }
  }
}

export const fetchOrders = () => {
  return async dispatch =>{
    dispatch({ type: "FETCH_ORDERS_START" })
    try {
      const { data: orders } = await getOrders()
      dispatch({ type: "FETCH_ORDERS_SUCCESS", payload: { orders } })
    } catch (error) {
      console.error(error)
      dispatch({ type: "FETCH_ORDERS_FAIL" })
    }
  }
}

export const fetchUserInfo = id_user => {
  return async dispatch =>{
    try {
      if (id_user){
        //const dataFixture = { name: 'Ranto', messages: [ { id: 1, bot: false, content: "Bonjour" }, { id: 2, bot: true, content: "Bonjour, comment allez-vous?" }, { id: 3, bot: false, content: "Bien" }, { id: 1, bot: false, content: "Bonjour" }, { id: 2, bot: true, content: "Bonjour, comment allez-vous?" }, { id: 3, bot: false, content: "Bien" }, { id: 1, bot: false, content: "Bonjour" }, { id: 2, bot: true, content: "Bonjour, comment allez-vous?" }, { id: 3, bot: false, content: "Bien" }, { id: 1, bot: false, content: "Bonjour" }, { id: 2, bot: true, content: "Bonjour, comment allez-vous?" }, { id: 3, bot: false, content: "Bien" }, { id: 1, bot: false, content: "Bonjour" }, { id: 2, bot: true, content: "Bonjour, comment allez-vous?" }, { id: 3, bot: false, content: "Bien oa" }]}
        const { data } = await getUserInfos(id_user)
        dispatch({ type: "FETCH_USERINFO", payload: { userInfo: data } })
      } else dispatch({ type: "FETCH_USERINFO", payload: { userInfo: { messages: [] } } })
    } catch (error) {
       console.error(error)
      }
  }
}

export const fetchRestInfo = () => {
  return async dispatch =>{
    dispatch({ type: "FETCH_RESTINFO_START" })
    try {
      const { data: restInfo } = await getRestInfo()
      dispatch({ type: "FETCH_RESTINFO_SUCCESS", payload: { restInfo } })
    } catch (error) {
      console.error(error)
      dispatch({ type: "FETCH_RESTINFO_FAIL" })
    }
  }
} 

export const fetchSales = () => {
  return async dispatch =>{
    dispatch({ type: "FETCH_SALES_START" })
    try {
      const { data: sales } = await getSales()
      dispatch({ type: "FETCH_SALES_SUCCESS", payload: { sales } })
    } catch (error) {
      console.error(error)
      dispatch({ type: "FETCH_SALES_FAIL" })
    }
  }
}