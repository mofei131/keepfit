
import Promise from 'es6-promise'
Promise.polyfill()

import head from "../components/head"
import headOne from "../components/headOne"
import vScreen from "../components/screen"
// import ue from "../components/UE"
// import TTable from "../components/table"
// import FormVue from "../components/formVue"
// import SearchForm from "../components/searchForm"

export default function install (Vue) {
    Vue.component('my-head', head)
    Vue.component('my-head-one', headOne)
    Vue.component('v-screen', vScreen)
  // Vue.component('uediter', ue)
  // Vue.component('t-table', TTable)
  // Vue.component('form-vue', FormVue)
  // Vue.component('search-form', SearchForm)
}
