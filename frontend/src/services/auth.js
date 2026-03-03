import api from "../api";

export const singUp = (data)=>{
    return api.post("/v1/auth/sign-up", data)   

}