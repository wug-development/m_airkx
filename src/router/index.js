import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    },
    routes: [
        {
            path: '/',
            name: 'Index',
            component(resolve) {
                require(['@/components/Index'], resolve)
            }
        },
        {
            path: '/visa',
            name: 'Visa',
            component(resolve) {
                require(['@/components/Visa'], resolve)
            }
        },
        {
            path: '/safe',
            name: 'Safe',
            component(resolve) {
                require(['@/components/Safe'], resolve)
            }
        },
        {
            path: '/hotel',
            name: 'Hotel',
            component(resolve) {
                require(['@/components/Hotel'], resolve)
            }
        },
        {
            path: '/visasearch',
            name: 'VisaSearch',
            component(resolve) {
                require(['@/components/VisaSearch'], resolve)
            }
        },
        {
            path: '/flightlist',
            name: 'FlightList',
            component(resolve) {
                require(['@/components/FlightList'], resolve)
            }
        },
        {
            path: '/returnflight',
            name: 'ReturnFlight',
            component(resolve) {
                require(['@/components/ReturnFlight'], resolve)
            }
        },
        {
            path: '/flightinfo',
            name: 'FlightInfo',
            component(resolve) {
                require(['@/components/FlightInfo'], resolve)
            }
        },
        {
            path: '/my',
            name: 'My',
            component(resolve) {
                require(['@/components/My'], resolve)
            }
        },
        {
            path: '/service',
            name: 'Service',
            component(resolve) {
                require(['@/components/Service'], resolve)
            }
        },
        {
            path: '/about',
            name: 'About',
            component(resolve) {
                require(['@/components/About'], resolve)
            }
        },
        {
            path: '/complaint',
            name: 'Complaint',
            component(resolve) {
                require(['@/components/Complaint'], resolve)
            }
        },
        {
            path: '/addlinkman',
            name: 'AddLinkman',
            component(resolve) {
                require(['@/components/AddLinkman'], resolve)
            }
        },
        {
            path: '/addperson',
            name: 'AddPerson',
            component(resolve) {
                require(['@/components/AddPerson'], resolve)
            }
        },
        {
            path: '/orderinfo',
            name: 'OrderInfo',
            component(resolve) {
                require(['@/components/OrderInfo'], resolve)
            }
        },
        {
            path: '/firstcabin',
            name: 'FirstCabin',
            component(resolve) {
                require(['@/components/FirstCabin'], resolve)
            }
        },
        {
            path: '/qyyj',
            name: 'QYYJ',
            component(resolve) {
                require(['@/components/QYYJ'], resolve)
            }
        },
        {
            path: '/zfcg',
            name: 'ZFCG',
            component(resolve) {
                require(['@/components/ZFCG'], resolve)
            }
        },
        {
            path: '/searchresult',
            name: 'SearchResult',
            component(resolve) {
                require(['@/components/SearchResult'], resolve)
            }
        }
    ]
})
