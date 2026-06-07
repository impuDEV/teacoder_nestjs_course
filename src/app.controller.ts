import { Body, Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('App')
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello() {
		return this.appService.getHello()
	}

	@Post()
	create(@Body('title') title: string) {
		return `Movie: ${title}`
	}

	@Get('@me')
	getProfile() {
		return {
			id: 1,
			username: 'impuDEV',
			email: 'impudev@gmail.com',
		}
	}
}
