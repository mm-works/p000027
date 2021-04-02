import React, { useState, useEffect } from 'react';
import taro from '@tarojs/taro';
import { View, Text, Swiper, SwiperItem, Image, RichText } from '@tarojs/components'

import './pg003.css';
import a002 from '../../atoms/a002';
import a003 from '../../atoms/a003';

type Picture = Pick<ITbpictures, "src">;

interface Result {
	data1: ITbmaterial;
	data2: Picture[];
};

export default function pg003() {
	const [data, setdata] = useState<Result>();
	const router = taro.useRouter<{ id: string; }>();
	useEffect(() => {
		void (async () => {
			const d = await a002<Result>('pg003/s001', {
				id: router.params.id
			});
			setdata(d);
		})();
	}, []);
	return (
		<>
			<C001 data={data?.data2} />
			<C002 data={data?.data1} />
			<View>
			</View>
		</>
	);
}

/**
 * 轮播
 */
function C001({ data }: { data?: Picture[]; }) {
	if (!data) {
		return <Text className='err'>未查询到数据!</Text>;
	}
	return <>
		<Swiper
			indicatorColor='#999'
			indicatorActiveColor='#333'
			circular
			indicatorDots
			autoplay>
			{data?.map((it, key) => {
				const uri = a003(it.src);
				return <SwiperItem key={key}>
					<Image src={uri} />
				</SwiperItem>
			})}
		</Swiper>
	</>;
}

/**
 * 详情
 */
function C002({ data }: { data?: ITbmaterial; }) {
	if (!data) {
		return <Text className='err'>未获取到数据.</Text>
	}
	return <>
		<View>
			产品名称:{data.name}
		</View>
		<View>
			详细信息:
			<RichText nodes={data.description}></RichText>
		</View>
	</>;
}
