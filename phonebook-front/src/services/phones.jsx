import axios from 'axios';

const baseUrl = '/api/notes'


const getAll = () => {
    const request = axios.get(baseUrl)

    return request.then(response => response.data)

}



const createNumber =   (newNumber) => {

    const request = axios.post(baseUrl, newNumber)
    return request.then(response => response.data)

}

const editNumber =   (newData,id) => {

    const request = axios.put(`${baseUrl}/${id}`, newData)
    return request.then(response => response.data).catch(error => error.data)


}


const deleteNumber = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)

    return request.then(response => response.data)
}


export default {
    getAll,
    createNumber,
    editNumber,
    deleteNumber
}