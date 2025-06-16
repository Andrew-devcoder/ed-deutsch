import { verbs } from '@/data/verbsA1';

export function getRandomVerbs(count: number = 10) {
	const a1Verbs = verbs.filter((v) => v.level === 'A1');
	const shuffled = [...a1Verbs].sort(() => Math.random() - 0.5);
	return shuffled.slice(0, count);
}
