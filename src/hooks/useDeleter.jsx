import useFeedback from "./useFeedback"
import { deleteDish as deleteDishAPI } from '../API/axios'

const useDeleter = () =>{
    const feedback = useFeedback()

    const deleteDish = async id => {
        feedback.clear()
        try {
           const { status } = await deleteDishAPI(id)
            if (status == 200) return true
        } catch (error) { console.error(error) }
        return false
    }

    return { deleteDish }
}

export default useDeleter