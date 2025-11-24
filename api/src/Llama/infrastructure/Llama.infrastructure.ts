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
            "HTTP-Referer": "http://localhost:5173/", // Optional. Site URL for rankings on openrouter.ai.
            "X-Title": "chat", // Optional. Site title for rankings on openrouter.ai.
        },
    });
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
