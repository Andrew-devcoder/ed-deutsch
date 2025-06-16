import { verbsA1 } from '@/data/verbsA1';
import { verbsA2 } from '@/data/verbsA2';

export function getRandomVerbs(levelParam: string, countTotal: number = 10) {
	const levels = levelParam.split(',').filter((l) => l === 'A1' || l === 'A2');

	let selected: typeof verbsA1 = [];

	if (levels.includes('A1') && levels.includes('A2')) {
		selected = [...shuffle(verbsA1).slice(0, countTotal / 2), ...shuffle(verbsA2).slice(0, countTotal / 2)];
	} else if (levels.includes('A1')) {
		selected = shuffle(verbsA1).slice(0, countTotal);
	} else if (levels.includes('A2')) {
		selected = shuffle(verbsA2).slice(0, countTotal);
	}

	return shuffle(selected);
}

function shuffle<T>(array: T[]): T[] {
	return [...array].sort(() => Math.random() - 0.5);
}
