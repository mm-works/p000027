import a004 from './a004';

const server = a004();

/**
 * get image url
 */
export default function a003(id: string) {
	return `${server}/api/getfile/${id}`;
}
