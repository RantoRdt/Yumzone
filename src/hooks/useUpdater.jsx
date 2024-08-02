import useFeedback from "./useFeedback"
import { updateRestInfo as updateInfoAPI } from "../API/axios"
import useLanguage from "./useLanguage"
import { useDispatch } from "react-redux"
import { fetchRestInfo } from "../redux/actions"

const useUpdater = () =>{
    const feedback = useFeedback()
    const { text } = useLanguage()
    const dispatch = useDispatch()

    const updateInfo = async data => {
        feedback.clear()
        const { place, phone, hour1from, hour6from, hour7from, hour1to, hour6to, hour7to } = data
        const formate = h => { return h.format('HH:mm') }
        try {
            const { status } = await updateInfoAPI({
                place, phone, schedule: [
                    { day: 1, from: formate(hour1from), to: formate(hour1to) },
                    { day: 6, from: formate(hour6from), to: formate(hour6to) },
                    { day: 7, from: formate(hour7from), to: formate(hour7to) },
                ]
            })
            if (status == 200){
                feedback.show("success", text.success)
                dispatch(fetchRestInfo())
            }
        } catch (error) {
            console.error(error)
            feedback.show("error", text.somethingwentwrong)
        }
    }

    return { updateInfo }
}

export default useUpdater