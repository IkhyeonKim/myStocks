export const isWeekend = (day) => {
    if(day === 0){
        return 2 // Sunday
    }else if(day === 6){
        return 1 // Saturday
    }else {
        return 0
    }
}

export default {
    isWeekend
}
