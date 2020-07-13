import axios from "axios"
let copy = axios.create({
  baseURL: "http://127.0.0.1/heimamm/public",
  withCredentials: true,
})
copy.interceptors.request.use(
  function(config) {
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
copy.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    return Promise.reject(error)
  }
)
function getRcode(data) {
  return copy({
    url: "/sendsms",
    method: "post",
    data,
  })
}

function register(data) {
  return copy({
    url: "/register",
    method: "post",
    data,
  })
}
export { getRcode, register }
