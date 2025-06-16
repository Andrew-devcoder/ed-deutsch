'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
	const router = useRouter();
	const [levels, setLevels] = useState<{ A1: boolean; A2: boolean }>({
		A1: true,
		A2: false,
	});

	const toggleLevel = (level: 'A1' | 'A2') => {
		setLevels((prev) => ({ ...prev, [level]: !prev[level] }));
	};

	const selectedLevels = Object.entries(levels)
		.filter(([, selected]) => selected)
		.map(([key]) => key);

	const startQuiz = () => {
		const query = selectedLevels.join(',');
		router.push(`/quiz?level=${query}&id=1`);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen gap-8">
			<h1 className="text-3xl font-bold">Оберіть рівень складності</h1>

			<div className="flex gap-6">
				<label className="flex items-center gap-2">
					<input type="checkbox" checked={levels.A1} onChange={() => toggleLevel('A1')} />
					A1
				</label>
				<label className="flex items-center gap-2">
					<input type="checkbox" checked={levels.A2} onChange={() => toggleLevel('A2')} />
					A2
				</label>
			</div>

			<button
				onClick={startQuiz}
				disabled={selectedLevels.length === 0}
				className={`px-6 py-3 text-lg rounded-lg transition ${
					selectedLevels.length === 0
						? 'bg-gray-400 cursor-not-allowed'
						: 'bg-blue-600 text-white hover:bg-blue-700'
				}`}
			>
				Почати
			</button>
		</div>
	);
}
