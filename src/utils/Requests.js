import axios from 'axios'

const client = (() => {
    return axios.create({
        baseURL: "http://localhost"
    })

})();

