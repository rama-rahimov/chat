export interface LlamaRepository {
 answerFromLlama(message:string):Promise<any>;
}