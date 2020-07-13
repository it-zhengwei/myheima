import axios from "axios"
let copy = axios.create({
  baseURL: "http://127.0.0.1/heimamm/public",
  withCredentials: true,
})
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
