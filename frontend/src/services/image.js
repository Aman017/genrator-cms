import api from "../api";

export const generateImage = (data)=>{
    return api.post("/v1/image/generate", data)   

}
export const imageHistory = (data)=>{
    return api.get("/v1/image/history")   

}

