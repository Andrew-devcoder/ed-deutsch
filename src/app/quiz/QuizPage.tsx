'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getRandomVerbs } from '../utils/shuffleVerbs';

type Verb = {
	infinitiv: string;
	options: string[];
	correct: string;
	level: string;
	type: string;
};

export default function QuizPage() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const id = parseInt(searchParams.get('id') || '1', 10);
	const correct = parseInt(searchParams.get('correct') || '0', 10);
	const levelParam = searchParams.get('level') || 'A1';

	const [questions, setQuestions] = useState<Verb[]>([]);
	const [selected, setSelected] = useState<string | null>(null);
	const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

	// Отримуємо / генеруємо список питань один раз
	useEffect(() => {
		const storageKey = `questions-${levelParam}`;

		const stored = sessionStorage.getItem(storageKey);
		if (stored) {
			setQuestions(JSON.parse(stored));
		} else {
			const generated = getRandomVerbs(levelParam);
			sessionStorage.setItem(storageKey, JSON.stringify(generated));
			setQuestions(generated);
		}
	}, [levelParam]);

	// Перемішуємо опції
	useEffect(() => {
		setSelected(null);
		const question = questions[id - 1];
		if (question) {
			setShuffledOptions([...question.options].sort(() => Math.random() - 0.5));
		}
	}, [id, questions]);

	const question = questions[id - 1];

	// Обробка відповіді
	useEffect(() => {
		if (!question || !selected) return;

		const isCorrect = selected === question.correct;

		if (isCorrect) {
			const timeout = setTimeout(() => {
				if (id >= questions.length) {
					router.push(`/result?correct=${correct + 1}&total=${questions.length}`);
				} else {
					router.push(`?id=${id + 1}&correct=${correct + 1}&level=${levelParam}`);
				}
			}, 1000);
			return () => clearTimeout(timeout);
		}
	}, [selected, question, id, correct, levelParam, questions.length, router]);

	if (!question) {
		return (
			<div className="p-4">
				<h1>Питання не знайдено</h1>
				<button onClick={() => router.push('/')}>На головну</button>
			</div>
		);
	}

	return (
		<div className="p-4">
			<h2 className="text-xl mb-4 text-center">
				Partizip II для: <b>{question.infinitiv}</b>
			</h2>
			<div className="grid gap-2 grid-cols-2 max-w-md mx-auto">
				{shuffledOptions.map((option) => {
					const isCorrect = option === question.correct;
					const isSelected = selected === option;

					let buttonStyle =
						'border px-4 py-2 rounded transition-colors hover:bg-blue-500 hover:cursor-pointer';

					if (selected) {
						if (isCorrect) buttonStyle += ' bg-green-400';
						else if (isSelected) buttonStyle += ' bg-red-400';
						else buttonStyle += ' opacity-60';
					}

					return (
						<button
							key={option}
							onClick={() => {
								if (!selected) setSelected(option);
							}}
							className={buttonStyle}
							disabled={!!selected}
						>
							{option}
						</button>
					);
				})}
			</div>

			{selected && selected !== question.correct && (
				<div className="mt-4 mx-auto w-fit">
					<button
						onClick={() => {
							if (id >= questions.length) {
								router.push(`/result?correct=${correct}&total=${questions.length}`);
							} else {
								router.push(`?id=${id + 1}&correct=${correct}&level=${levelParam}`);
							}
						}}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:cursor-pointer hover:bg-blue-600"
					>
						Далі
					</button>
				</div>
			)}
		</div>
	);
}
