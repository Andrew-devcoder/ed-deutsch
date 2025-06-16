'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function ResultPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const correct = parseInt(searchParams.get('correct') || '0', 10);
	const total = parseInt(searchParams.get('total') || '0', 10);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
			<h1 className="text-3xl font-bold mb-4">Результат</h1>
			<p className="text-xl">
				Ви відповіли правильно на <span className="font-semibold">{correct}</span> з{' '}
				<span className="font-semibold">{total}</span> питань.
			</p>
			<button
				onClick={() => router.push('/')}
				className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:cursor-pointer hover:bg-blue-700 transition"
			>
				Почати заново
			</button>
		</div>
	);
}
