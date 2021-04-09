import React, { useState, useEffect } from 'react';
import { View, Text, RichText } from '@tarojs/components';
import taro from '@tarojs/taro';

import './pg005.css';
import a002 from '../../atoms/a002';

type Result = ITbnews | {
	ok: false,
	message: string;
};

type Message = {
	id: string;
}

const s001 = 'pg005/s001';

export default function pg005() {
	const [data, setdata] = useState<ITbnews>();
	const router = taro.useRouter<Message>();
	useEffect(() => {
		void (async () => {
			const result = await a002<Result>(s001, {
				id: router.params.id
			});
			setdata(result as ITbnews);
		})();
	}, []);
	if (!data) {
		return <>Loading...</>;
	}
	const d = new Date();
	d.setTime(data.time);
	const tm = d.toLocaleDateString();
	return (
		<>
			<View>
				<Text className='p005s001'>{data.title}</Text>
			</View>
			<View>
				<Text className='p005s002'>作者:{data.author}</Text>
			</View>
			<View>
				<Text className='p005s003'>发布时间:{tm}</Text>
			</View>
			<View>
				<RichText className='p005s004' nodes={data.content}></RichText>
			</View>
		</>
	);
}
