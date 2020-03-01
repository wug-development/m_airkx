// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import router from './router'
import swipe from 'mint-ui/lib/swipe'
import 'mint-ui/lib/swipe/style.css'
import swipeItem from 'mint-ui/lib/swipe-item'
import 'mint-ui/lib/swipe-item/style.css'
import spinner from 'mint-ui/lib/spinner'
import 'mint-ui/lib/spinner/style.css'
import datetimePicker from 'mint-ui/lib/datetime-picker'
import 'mint-ui/lib/datetime-picker/style.css'
import indexList from 'mint-ui/lib/index-list'
import 'mint-ui/lib/index-list/style.css'
import indexSection from 'mint-ui/lib/index-section'
import 'mint-ui/lib/index-section/style.css'
import cell from 'mint-ui/lib/cell'
import 'mint-ui/lib/cell/style.css'
import radio from 'mint-ui/lib/radio'
import 'mint-ui/lib/radio/style.css'
import picker from 'mint-ui/lib/picker'
import 'mint-ui/lib/picker/style.css'
import messagebox from 'mint-ui/lib/message-box'
import 'mint-ui/lib/message-box/style.css'
import indicator from 'mint-ui/lib/indicator'
import 'mint-ui/lib/indicator/style.css'
import carousel from 'element-ui/lib/carousel'
import carouselItem from 'element-ui/lib/carousel-item'
import checkbox from 'element-ui/lib/checkbox'
import 'element-ui/lib/theme-chalk/index.css'

import common from '../common/common'


Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.prototype.utils = common.utils
Vue.prototype.uri = process.env.API_URL
Vue.prototype.uriw = process.env.APIW_URL
Vue.prototype.userID = ''
Vue.prototype.MessageBox = messagebox
Vue.prototype.Indicator = indicator
// Vue.$http.options.emulateHTTP = true;
// Vue.$http.options.emulateJSON = true;

Vue.component(swipe.name, swipe)
Vue.component(swipeItem.name, swipeItem)
Vue.component(spinner.name, spinner)
Vue.component(datetimePicker.name, datetimePicker)
Vue.component(indexList.name, indexList)
Vue.component(indexSection.name, indexSection);
Vue.component(cell.name, cell);
Vue.component(radio.name, radio);
Vue.component(picker.name, picker);
Vue.component(messagebox.name, messagebox);
//Vue.component(indicator.name, indicator);
Vue.component(carousel.name, carousel)
Vue.component(carouselItem.name, carouselItem)
Vue.component(checkbox.name, checkbox)


window.Promise = Promise || Vue.Promise

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

