import Vue from 'vue';
import Router from 'vue-router';

const a = resolve => require(['../components/a.vue'], resolve);
const TreeItem = resolve => require(['../components/TreeItem.vue'], resolve);

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/pages/a',
            component: a,
            name: 'a'
        }, {
            path: '/pages/TreeItem',
            component: TreeItem,
            name: 'TreeItem'
        }
    ]
});
