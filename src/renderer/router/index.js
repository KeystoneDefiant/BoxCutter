import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
	{
		path: '/',
		name: 'Welcome',
		component: require('@/components/Welcome').default
	},
	{
		path: '/filepaths',
		name: 'FilePaths',
		component: require('@/components/FilePaths').default
	},
	{
		path: '/exportlist',
		name: 'ExportList',
		component: require('@/components/ExportList').default
	},
	{
		path: '/exportprocess',
		name: 'ExportProcess',
		component: require('@/components/ExportProcess').default
	},
	{
		path: '*',
		redirect: '/'
	}
  ]
})
