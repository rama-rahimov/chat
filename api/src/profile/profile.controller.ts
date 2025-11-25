import {Controller, Get, Param, Req} from "@nestjs/common";
import {ProfileService} from "./profile.service";

@Controller('api/profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService ) {}
    @Get('users')
    allUsers(@Req() req:Request) {
        const userId = (req as any).user.id
        return this.profileService.allUsers(+userId);
    }

    @Get('me')
    getMyData(@Req() req:Request){
      return (req as any).user
    }

    @Get("find/:username")
    getUserByUsername(@Param("username") username:string, @Req() req:Request) {
      return this.profileService.findByUsername(username, (req as any).user.id);
    }
}