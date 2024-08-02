import moment from "moment";
import useLanguage from "./useLanguage";
import 'moment/locale/fr'

const useMoment = () =>{
    const { language } = useLanguage()
    moment.locale(language)

    const capitalize = word => { return word.charAt(0).toUpperCase() + word.substring(1) }

    const weeklyDay = n => {
        switch (n) {
            case 1:
                const d1 = moment().day(1).format('dddd') 
                const d5 = moment().day(5).format('dddd')
                return capitalize(d1) + ' - ' + capitalize(d5)
        
            default:
                const dn = moment().day(n).format('dddd')
                return capitalize(dn)
        }
        
    }

    const timeFormat = t => { return moment(t, 'HH:mm').format('HH[h]mm[mn]') }

    return { weeklyDay, timeFormat }
}
export default useMoment