import { Suspense } from 'react';
import ResultPage from './ResultPage';

export default function Page() {
	return (
		<Suspense fallback={<div>Завантаження результатів…</div>}>
			<ResultPage />
		</Suspense>
	);
}
