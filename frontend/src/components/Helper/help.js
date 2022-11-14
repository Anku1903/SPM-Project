
import cookie from 'js-cookie'
const SETNAME = "dgfgxvdvsr45gn656vck"
const SETEMAIL = "dnif8yiutyhdio"
const SETOWNER = "iorjgojgoidnvonlk"

const SETIMAGE = "ruigjnjxcnb"
export const setCookie = (user) => {
    cookie.set(SETNAME,user.name,{expires: 2})
    cookie.set(SETEMAIL,user.email,{expires: 2})
    cookie.set(SETOWNER,user.isowner,{expires: 2})
    
    cookie.set(SETIMAGE,user.image,{expires: 2})
}

export const removeCookie = () => {
    
    cookie.remove(SETEMAIL,{expires: 2})
    
    cookie.remove(SETNAME,{expires: 2})
    
    cookie.remove(SETOWNER,{expires: 2})
    
    cookie.remove(SETIMAGE,{expires: 2})
}

export const getCookie = () => {
    const name = cookie.get(SETNAME)
    const email = cookie.get(SETEMAIL)
    const isowner = cookie.get(SETOWNER)
    
    const image = cookie.get(SETIMAGE)
    if(name && email)
        return {name,email,isowner,image}
    else
        return null

}


export const auth = () => {
   const token = getCookie();
    if(token){
        return token
    }
    else{
        return false
    }
}

export const serverurl = "http://localhost:7000"