import {Module} from "@nestjs/common";
import {LlamaInfrastructure} from "./infrastructure/Llama.infrastructure";

@Module({
providers:[{
    provide:"BotRepository",
    useClass:LlamaInfrastructure,
}],
exports: [{
    provide:"BotRepository",
    useClass:LlamaInfrastructure,
}]
})

export class LlamaModule {}