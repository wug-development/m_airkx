import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Visa from '@/components/Visa'
import Safe from '@/components/Safe'
import Hotel from '@/components/Hotel'
import VisaSearch from '@/components/VisaSearch'
import FlightList from '@/components/FlightList'
import ReturnFlight from '@/components/ReturnFlight'
import FlightInfo from '@/components/FlightInfo'
import My from '@/components/My'
import Service from '@/components/Service'
import About from '@/components/About'
import Complaint from '@/components/Complaint'
import OrderInfo from '@/components/OrderInfo'
import AddLinkman from '@/components/AddLinkman'
import AddPerson from '@/components/AddPerson'
import FirstCabin from '@/components/FirstCabin'
import QYYJ from '@/components/QYYJ'
import ZFCG from '@/components/ZFCG'
import SearchResult from '@/components/SearchResult'

Vue.use(Router)

export default new Router({
  scrollBehavior(to,from,savedPosition){
    return {x:0,y:0}
  },
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/visa',
      name: 'Visa',
      component: Visa
    },
    {
      path: '/safe',
      name: 'Safe',
      component: Safe
    },
    {
      path: '/hotel',
      name: 'Hotel',
      component: Hotel
    },
    {
      path: '/visasearch',
      name: 'VisaSearch',
      component: VisaSearch
    },
    {
      path: '/flightlist',
      name: 'FlightList',
      component: FlightList
    },
    {
      path: '/returnflight',
      name: 'ReturnFlight',
      component: ReturnFlight
    },
    {
      path: '/flightinfo',
      name: 'FlightInfo',
      component: FlightInfo
    },
    {
      path: '/my',
      name: 'My',
      component: My
    },
    {
      path: '/service',
      name: 'Service',
      component: Service
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/complaint',
      name: 'Complaint',
      component: Complaint
    },
    {
      path: '/addlinkman',
      name: 'AddLinkman',
      component: AddLinkman
    },
    {
      path: '/addperson',
      name: 'AddPerson',
      component: AddPerson
    },
    {
      path: '/orderinfo',
      name: 'OrderInfo',
      component: OrderInfo
    },
    {
      path: '/firstcabin',
      name: 'FirstCabin',
      component: FirstCabin
    },
    {
      path: '/qyyj',
      name: 'QYYJ',
      component: QYYJ
    },
    {
      path: '/zfcg',
      name: 'ZFCG',
      component: ZFCG
    },
    {
      path: '/searchresult',
      name: 'SearchResult',
      component: SearchResult
    }
  ]
})
