import { fetchResults } from '$lib';
import { writable } from 'svelte/store';

// Setup Interfaces
export interface WikipediaResult {
    title: string,
    summary: string,
    relevance: string,
    link: string
}

export interface Result {
    results: WikipediaResult[]
}

// Setup store
const resultsStore = writable<Result>({
    results: []
})

// Function to fetch results
async function fetchOpenAIResults(query: string) {
    const data = await fetchResults(query) as Result
    resultsStore.set(data)
}

export { resultsStore, fetchOpenAIResults }