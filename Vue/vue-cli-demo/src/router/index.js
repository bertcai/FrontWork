import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import HelloEarth from '../components/HelloEarth'

Vue.use(Router)

export default new Router({
    routes: [{
            name: 'world',
            path: '/helloworld/:msg',
            component: HelloWorld
        },
        {
            name: 'earth',
            path: '/helloearth/:msg',
            component: HelloEarth
        }
    ]
})