export interface BotRepository {
    answer(message:string):Promise<string>;
}