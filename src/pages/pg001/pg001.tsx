import React, { useState, useEffect } from 'react'
import { View, Text, Swiper, SwiperItem, Image, Navigator } from '@tarojs/components'
import taro from '@tarojs/taro';
import a002 from '../../atoms/a002';
import a003 from '../../atoms/a003';

import './pg001.css'

interface Result {
	data1: ITbswiper[];
	data2: ITbtypes[];
}

export default function index() {
	const [data, setdata] = useState<Result>();
	useEffect(() => {
		void (async () => {
			const d = await a002<Result>('pg001/s001', {});
			setdata(d);
		})();
	}, []);
	return (
		<>
			<C001 data={data?.data1} />
			<C002 data={data?.data2} />
		</>
	);
}

/**
 * 轮播图
 */
function C001({ data }: { data?: ITbswiper[]; }) {
	return <>
		<Swiper
			indicatorColor='#999'
			indicatorActiveColor='#333'
			circular
			indicatorDots
			autoplay
		>
			{data?.map((it, key) => {
				const uri = a003(it.id);
				return <SwiperItem key={key}>
					<Image src={uri} />
				</SwiperItem>
			})}
		</Swiper>
	</>;
}

function C002({ data }: { data?: ITbtypes[]; }) {
	return <>
		{data?.map((it, key) => {
			return <C003 data={it} key={key} />;
		})}
	</>;
}

/**
 * 建材分类
 */
function C003({ data }: { data: ITbtypes; }) {
	const uri = a003(data.cover);
	const url = `/pages/pg002/pg002?type=${data.type}`;
	return <View>
		<Navigator url={url} className='p001s001'>
			<Image className='img' src={uri} />
			{data.name}
		</Navigator>
	</View>;
}
