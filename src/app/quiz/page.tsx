import { Suspense } from 'react';
import QuizPage from './QuizPage';

export default function Page() {
	return (
		<Suspense fallback={<div>Завантаження…</div>}>
			<QuizPage />
		</Suspense>
	);
}
