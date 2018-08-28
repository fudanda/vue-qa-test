// import Axios from 'axios'
// const Http = (path, method) => {
//   return (data, params) => {
//     const url = path
//     return Axios({
//       method: method,
//       url: url,
//       data: data,
//       params: params
//     }).then((response) => {
//       const res = response.data
//       return res
//     }).catch((error) => {
//       return error
//     })
//   }
// }

import Axios from 'axios'

const Http = (path, method) => {
  const url = path
  return () => {
    return Axios({
      method: method,
      url: url
    }).then((response) => {
      const res = response.data
      return res
    }).catch((error) => {
      return error
    })
  }
}
// addMethod(people, 'find', function () {
//   return this.values
// })
export function httpGet (path, method) {
  return Http(path, method)
}
