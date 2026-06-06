import {
	Body,
	Controller,
	Get,
	Post,
	UseGuards,
	UsePipes,
} from '@nestjs/common'
import { AppService } from './app.service'
import { StringToLowerCasePipe } from './common/pipes/string-to-lowerrcase.pipe'
import { AuthGuard } from './common/guards/auth.guard'
import { UserAgent } from './common/decorators/user-agent.decorator'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello() {
		return this.appService.getHello()
	}

	@UsePipes(StringToLowerCasePipe)
	@Post()
	create(@Body('title') title: string) {
		return `Movie: ${title}`
	}

	@UseGuards(AuthGuard)
	@Get('@me')
	getProfile(@UserAgent() userAgent: string) {
		return {
			id: 1,
			username: 'impuDEV',
			email: 'impudev@gmail.com',
			userAgent,
		}
	}
}
