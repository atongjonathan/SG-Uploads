import {useState, useEffect} from 'react';
import devtoolsDetect from 'devtools-detect';

export function useDevToolsStatus() {
	const [isDevToolsOpen, setIsDevToolsOpen] = useState(devtoolsDetect.isOpen);

	useEffect(() => {
		const handleChange = event => {
			setIsDevToolsOpen(event.detail.isOpen);
		};

		window.addEventListener('devtoolschange', handleChange);

		return () => {
			window.removeEventListener('devtoolschange', handleChange);
		};
	}, []);

	return false;
}