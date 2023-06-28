import { writable } from 'svelte/store';

export const expandedImage = writable<{ src: string; alt: string } | null>(null);
