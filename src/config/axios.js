import axios from 'axios'

export default axios.create({
    baseURL: 'https://bdg-frontend-mysql.herokuapp.com'
})
// export default axios.create({
//     baseURL: 'http://localhost:2019'
// })