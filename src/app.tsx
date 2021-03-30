import React, { ComponentType } from 'react';
import './app.css';

export default function App<T>({ children }: { children: ComponentType<T> }) {
	return (
		<>
			{children}
		</>
	);
}
