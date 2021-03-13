import axios from 'axios'

const success = res => res
const error = error => {
    if(error.response.status == 401){
        window.location = '/'
    }else{
        return Promise.reject(error)
    }
}

axios.interceptors.response.use(success, error)