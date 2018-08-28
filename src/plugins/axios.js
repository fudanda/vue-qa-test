import axios from 'axios'
import api from '../api/api'

export default ({ Vue }) => {
  Vue.prototype.$api = api
  Vue.prototype.$axios = axios
}
