import axios from 'axios'
import formData from './formData';

export const url = 'http://localhost:5000'

const axiosInstance = axios.create({
  baseURL: `${url}/api`,
  headers: { 'Content-Type': 'multipart/form-data' }
})

const botAxiosInstance = axios.create({
  baseURL: 'http://localhost:5005/webhooks/rest/webhook'
})

const get = axiosInstance.get
const post = axiosInstance.post
const del = axiosInstance.delete
const chat = botAxiosInstance.post

export const getPlaceName = async ([longitude, latitude]) => { return await chat(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`) }
export const sendMessage = async (message, name) => { return await post('/', JSON.parse(`{ "message": "${message}"${name ? `, "sender": "${name}"` : ''} }`)) }
export const saveMessage = async data => { return await post('/message/save', formData(data)) }
export const login = async data => { return await post('/auth/login', formData(data)) }
export const googleLogin = async data => { return await post('/auth/google', formData(data)) }
export const signUp = async data => { return await post('/auth/signup', formData(data)) }
export const createDish = async data => { return await post('/new/dish', formData(data)) }
export const getDishes = async () => { return await get('/list/dishes') }
export const deleteDish = async id => { return await del(`/delete/dish/${id}`) }
export const getUserInfos = async id => { return await get(`/infos/user/${id}`)  }
export const createOrder = async data => { return await post('/new/order', formData(data)) }
export const getOrders = async () => { return await get('/list/orders') }
export const getRestInfo = async () => { return await get('/infos/info') }
export const updateRestInfo = async data => { return await post('/edit/info', formData(data)) }
export const getSales = async () => { return await get('/infos/sales') }