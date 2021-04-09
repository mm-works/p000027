import taro from '@tarojs/taro';
import './app.css';

export default {
	pages: [
		'pages/pg001/pg001',
		'pages/pg002/pg002',
		'pages/pg003/pg003',
		'pages/pg004/pg004',
		'pages/pg005/pg005'
	],
	tabBar: {
		list: [{
			iconPath: './imgs/jcjc2.svg',
			selectedIconPath: './imgs/jcjc1.svg',
			text: '装修建材',
			pagePath: 'pages/pg001/pg001'
		}, {
			iconPath: './imgs/jcxg2.svg',
			selectedIconPath: './imgs/jcxg1.svg',
			text: '新闻资讯',
			pagePath: 'pages/pg004/pg004'
		}]
	},
	window: {
		backgroundTextStyle: 'light',
		navigationBarBackgroundColor: '#fff',
		navigationBarTitleText: 'Mmstudio',
		navigationBarTextStyle: 'black'
	}
} as taro.AppConfig;
