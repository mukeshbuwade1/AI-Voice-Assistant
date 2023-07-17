import axios from "axios";
import { openAI_KEY } from "../assets/constant";

const client = axios.create({
    headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
    }
})

const chatgptUrl = 'https://api.openai.com/v1/chat/completions';
const dalleUrl = 'https://api.openai.com/v1/images/generations';

export async function getAnswer(prompt = "How are you", messages) {
    console.log("first")
    try {
        const res = await axios.post(chatgptUrl, {
            // model: "gpt-3.5-turbo",
            // messages: [{
            //     role: 'user',
            //     content: `Does this message want to generate an AI picture, image, art or anything similar? ${prompt} . Simply answer with a yes or no.`
            // }]
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Hello!"}]
        },
            {
                headers: {
                    "Authorization": `Bearer ${openAI_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
        // isArt = res.data?.choices[0]?.message?.content;
        // isArt = isArt.trim();
        // if (isArt.toLowerCase().includes('yes')) {
        //     console.log('dalle api call');
        //     return dalleApiCall(prompt, messages)
        // } else {
        //     console.log('chatgpt api call')
        //     return chatgptApiCall(prompt, messages);
        // }

    } catch (err) {
        console.log('error: ', err);
        // return Promise.resolve({ success: false, msg: err.message });
    }
}
function dalleApiCall() {

}
function chatgptApiCall() {

}