import { format } from "date-fns"

export const formatDate = (day:Date)=>{
    return format(day, "yyyy-MM-dd")
}