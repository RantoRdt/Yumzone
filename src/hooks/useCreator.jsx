import useFeedback from "./useFeedback"
import { createDish as createDishAPI, createOrder as createOrderAPI } from '../API/axios'
import useLanguage from './useLanguage'
import { useContext } from "react"
import { AuthStateContext } from "../components/Auth/authState"

const useCreator = () =>{
    const { text } = useLanguage()
    const feedback = useFeedback()
    const { userId } = useContext(AuthStateContext)

    const createDish = async (data, image) =>{
        const { category, has_pork, name, price } = data
        feedback.clear()
        try {
            const { status } = await createDishAPI({ name: name, unit_price: price, has_pork: has_pork.toString(), id_cat: category, image: image})
            if (status == 201) {
                feedback.show("success", text.success)
                return true
            }
        } catch (error) {
            console.error(error)
            feedback.show("error", text.somethingwentwrong)
        }
    }

    const createOrder = async data => {
        const { deliveryPlace, dineIn, deliveryDate, orders:lines } = data
        feedback.clear()
        try {
            const { status } = await createOrderAPI({ deliveryPlace, dineIn, deliveryDate, lines, userId})
            if (status == 201) {
                feedback.show("success", text.success)
                return true
            }
        } catch (error) {
            console.error(error)
            feedback.show("error", text.somethingwentwrong)
        }
    }

    return { createDish, createOrder }
}

export default useCreator