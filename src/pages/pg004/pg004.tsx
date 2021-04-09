import React, { useState, useEffect } from 'react';
import { View, Text, Navigator } from '@tarojs/components';
import taro from '@tarojs/taro';

import './pg004.css';
import send_msg from '../../atoms/a002';

type IData = Pick<ITbnews, 'id' | 'title' | 'time'>;

type Result = {
	ok: true;
	data: IData[];
	count: number;
} | {
	ok: false;
	message: string;
};

const s001 = 'pg004/s001';

async function loaddata(page: number) {
	const no = page + 1;
	const data = await send_msg<Result>(s001, {
		page: no
	});
	if (data.ok === false) {
		taro.showToast({ title: data.message });
		return [];
	}
	return data.data;
}

export default function pg004() {
	const [page, setpage] = useState(0);
	const [data, setdata] = useState<IData[]>([]);
	useEffect(() => {
		void (async () => {
			const d = await loaddata(page);
			if (d.length > 0) {
				setdata(data.concat(d));
				setpage(page + 1);
			}
		})();
	}, []);
	taro.usePullDownRefresh(async () => {
		console.log('lalala');
		// taro.stopPullDownRefresh();
	});
	taro.useReachBottom(async () => {
		const d = await loaddata(page);
		if (d.length > 0) {
			setdata((data) => {
				return data.concat(d);
			});
			setpage((page) => {
				return page + 1;
			});
		}
	});
	if (data.length === 0) {
		return <>
			<div>
				Loadinging...
			</div>
		</>;
	}
	return (
		<>
			{data.map((it, key) => {
				return <C001 data={it} key={key} />
			})}
		</>
	);
}

function C001({ data }: { data: IData; }) {
	const url = `/pages/pg005/pg005?id=${data.id}`;
	const d = new Date();
	d.setTime(data.time);
	const tm = d.toLocaleDateString();
	return <View className='p004s003'>
		<Navigator url={url}>
			<Text className='p004s001'>{data.title}</Text>
			<Text className='p004s002'>发布时间：{tm}</Text>
		</Navigator>
	</View>;
}
