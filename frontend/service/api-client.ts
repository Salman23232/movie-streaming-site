import axios from 'axios'

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3',
    params:{
        api_key: "f2d84774f4dfed3e93c708a451d169ab"
    }
})

export default api