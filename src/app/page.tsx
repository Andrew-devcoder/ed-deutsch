'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();

	return (
		<div className="flex flex-col items-center justify-center min-h-screen gap-8">
			<h1 className="text-3xl font-bold">Натисни, щоб почати</h1>
			<button
				onClick={() => router.push('/quiz?id=1')}
				className="px-6 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer transition "
			>
				Почати
			</button>
		</div>
	);
}
