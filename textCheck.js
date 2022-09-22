const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "",
});
const openai = new OpenAIApi(configuration);

async function main() {
    const completion = await openai.createCompletion({
        model: "text-curie-001",
        prompt: "Correct this to standard English:\n\nShe no went to the market.",
        temperature: 0,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    console.log(completion.data.choices);
    console.log("--");
    console.log(completion.data.choices[0].text);
    return completion.data.choices[0].text
}

const response = main()

console.log({ response });