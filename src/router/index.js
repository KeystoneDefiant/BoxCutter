import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import FilePaths from '@/components/FilePaths'
import ExportList from '@/components/ExportList'
import ExportProcess from '@/components/ExportProcess'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
	  component: Welcome,
	},
	{
		path: '/filepaths',
		name: 'FilePaths',
		component: FilePaths,
	},
	{
		path: '/exportlist',
		name: 'ExportList',
		component: ExportList,
	},
	{
		path: '/exportprocess',
		name: 'ExportProcess',
		component: ExportProcess,
	}
  ]
})
