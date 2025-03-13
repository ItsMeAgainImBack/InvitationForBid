import axios from 'axios'

const url = '/api/graphql'

// const fetcher = () => request(url, query)
const fetcher2 = (query) => { return axios.post(url, { query }).then((res) => res.data) }

const notification = {
    message: 'nada consta',
    options: {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined    
    }
}

export { fetcher2, notification }
