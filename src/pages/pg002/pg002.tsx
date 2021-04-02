import React, { useState, useEffect } from 'react';
import { View, Text, Image, Navigator } from '@tarojs/components';
import taro from '@tarojs/taro';

import './pg002.css';
import a002 from '../../atoms/a002';
import a003 from '../../atoms/a003';

type Record = Pick<ITbmaterial, "id" | "cover" | "name">;
type Result = Record[];

export default function pg002() {
	const [data, setdata] = useState<Result>([]);
	const router = taro.useRouter<{ type: string; }>();
	console.log('aaa', router.params.type)
	useEffect(() => {
		void (async () => {
			const d = await a002<Result>('pg002/s001', {
				type: router.params.type
			});
			setdata(d);
		})();
	}, []);
	console.info('fff', data);
	return (
		<>
			<View>
				<Text>建材列表</Text>
				{data.map((it, key) => {
					return <C001 data={it} key={key} />
				})}
			</View>
		</>
	);
}

function C001({ data }: { data: Record; }) {
	const url = `/pages/pg003/pg003?id=${data.id}`
	return <View>
		<Navigator url={url}>
			<Text>名称:{data.name}</Text>
			{data.cover && <Image src={a003(data.cover)}></Image>}
		</Navigator>
	</View>;
}
