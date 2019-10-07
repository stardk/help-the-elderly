import api from '@/services/api'

export default {
  signup (params) {
    return api().post('signup', params)
  },
  signin (params) {
    return api().post('signin', params)
  },
  signout () {
    return api().get('signout')
  }
}
