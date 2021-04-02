import a001 from './a001';

import { getStorageSync, request, showToast } from '@tarojs/taro';

const ish5 = process.env.TARO_ENV === 'h5';	// h5 or weapp

const baseUrl = a001();

function gettoken() {
	try {
		return getStorageSync("token");
	} catch (error) {
		return ''
	}
}

export default function send_msg<T>(service: string, msg: unknown) {
	const data = JSON.stringify(msg);
	const url = `${baseUrl}/${service}`;
	const cookie = ish5 ? {} : { cookie: ('token=' + gettoken()) };
	return new Promise<T>((resolve, reject) => {
		request({
			method: 'POST',
			data,
			dataType: 'json',
			credentials: 'include',
			url,
			header: {
				...cookie,
				'Content-Type': 'application/json;charset=UTF-8'
			},
			success(res) {
				if (res.statusCode > 0 && res.statusCode < 400) {
					resolve(res.data as T);
					return;
				}
				reject();
				return showToast({
					title: '失败:status' + res.statusCode + ',data' + res.data
				});
			},
			fail(err) {
				showToast({
					title: '失败:' + err.errMsg
				});
				reject(err);
			}
		})
	});
}
