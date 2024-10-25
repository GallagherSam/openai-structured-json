<script lang="ts">
    import { resultsStore, fetchOpenAIResults } from "$lib/results.store";
    import { onDestroy } from "svelte";
    import { get } from "svelte/store";

    // Set ui state
    const ui = {
        loading: false
    }
    let query: string = ""

    // Get initial state
    let data = get(resultsStore)

    // Subscribe to data updates
    const dataUnsub = resultsStore.subscribe(value => {
        data = value
    })
    
    async function search() {
        ui.loading = true
        await fetchOpenAIResults(query);
        ui.loading = false
    }

    // Cleanup
    onDestroy(() => {
        dataUnsub()
    })
</script>

<h1 class="title">Wikipedia Article Finder</h1>
<div class="container">
    <p class="instructions">
        Type a prompt requesting information below and click "Submit" or press
        "Enter" to get relevant information.
    </p>

    <div class="input-group">
        <input
            type="text"
            placeholder="Type your query here..."
            bind:value={query}
            on:keydown={async (e) => e.key === "Enter" && await search()}
        />
        <button on:click={async (e) => await search()}>Submit</button>
    </div>

    {#if ui.loading == true}
        <p>Loading...</p>
    {/if}
    
    {#if data.results.length > 0}
        <div class="results">
            {#each data.results as result}
                <div class="result-item">
                    <a
                        class="result-title"
                        href={result.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {result.title}
                    </a>
                    <p class="result-summary">{result.summary}</p>
                    <p class="result-relevance">{result.relevance}</p>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .title {
        text-align: center;
        color: #ffffff;
        margin-bottom: 1rem;
    }

    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 2rem;
        background: #1e1e1e;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border-radius: 8px;
    }

    .instructions {
        font-size: 1rem;
        color: #b0b0b0;
        margin-bottom: 1rem;
        text-align: center;
    }

    .input-group {
        display: flex;
        margin-bottom: 1rem;
    }

    input[type="text"] {
        flex: 1;
        padding: 0.5rem;
        font-size: 1rem;
        background: #2b2b2b;
        color: #e0e0e0;
        border: 1px solid #444;
        border-radius: 4px 0 0 4px;
    }

    input[type="text"]::placeholder {
        color: #888;
    }

    button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        background-color: #007bff;
        color: #ffffff;
        border: none;
        border-radius: 0 4px 4px 0;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    button:hover {
        background-color: #0056b3;
    }

    .results {
        margin-top: 1.5rem;
    }

    .result-item {
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: #2b2b2b;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .result-title {
        font-size: 1.25rem;
        font-weight: bold;
        color: #3ea6ff;
        margin-bottom: 0.5rem;
        text-decoration: none;
    }

    .result-title:hover {
        text-decoration: underline;
    }

    .result-summary {
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
        line-height: 1.4;
        color: #d0d0d0;
    }

    .result-relevance {
        font-size: 0.85rem;
        color: #999;
    }
</style>
