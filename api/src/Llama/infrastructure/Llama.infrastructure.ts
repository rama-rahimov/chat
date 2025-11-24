import {Injectable} from "@nestjs/common";
import OpenAI from "openai";
import {BotRepository} from "../../chat/domain/bot.interface";

@Injectable()
export class LlamaInfrastructure implements BotRepository{
    async answer(message:string):Promise<any>{
    const openChatAI = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: "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",
        defaultHeaders: {
            "HTTP-Referer": "https://chat-test-nuaq.onrender.com/", // Optional. Site URL for rankings on openrouter.ai.
            "X-Title": "chat", // Optional. Site title for rankings on openrouter.ai.
        },
    });
    const taakk = await openChatAI.models.list();
    console.log({ taakk });
    const result =   await openChatAI.chat.completions.create({
      model: "meta-llama/llama-3.1-8b-instruct",
      messages: [
       {
        "role": "user",
        "content": message
       }]
    })
    return result.choices[0].message.content ;
  }
}
