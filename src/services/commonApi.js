import axios from "axios"
export const commonApi = (httpRequest,url,reqBody)=>{
    const reqConfig = {
        method : httpRequest,
        url,
        data : reqBody
    }
    return axios(reqConfig).then((res)=>{
        return res
    }).catch((err)=>{
        return err
    })
}