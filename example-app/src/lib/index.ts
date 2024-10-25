import OpenAI from "openai"
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from "zod";

import { OPENAI_API_KEY } from "./keys";

// Init the OpenAI client
const client = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // TODO: Call this out
})

// Define the models
const WikipediaResultModel = z.object({
    title: z.string(),
    summary: z.string(),
    relevance: z.string(),
    link: z.string()
})

const ResultsModel = z.object({
    results: z.array(WikipediaResultModel)
})

async function fetchResults(query: string) {
    const completion = await client.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        messages: [
            { role: "system", content: "Build 4 results with wikipedia pages that will help the user find the information they are looking for. Describe why the result is relevant in the relevance field." },
            { role: "user", content: query }
        ],
        response_format: zodResponseFormat(ResultsModel, "result")
    })
    console.log(completion)
    return completion.choices[0].message.parsed
}

export { fetchResults }