import taro from '@tarojs/taro';
import './app.css';

export default {
	pages: [
		'pages/pg001/pg001'
	],
	window: {
		backgroundTextStyle: 'light',
		navigationBarBackgroundColor: '#fff',
		navigationBarTitleText: 'Mmstudio',
		navigationBarTextStyle: 'black'
	}
} as taro.AppConfig;
