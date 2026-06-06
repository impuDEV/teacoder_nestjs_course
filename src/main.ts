import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { logger } from './common/middlewares/logger.middleware'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { AllExceptionsFilter } from './common/filters/all-exception.filter'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(new ValidationPipe())

	app.useGlobalInterceptors(new ResponseInterceptor())

	app.useGlobalFilters(new AllExceptionsFilter())

	const config = new DocumentBuilder()
		.setTitle('Nest Course API')
		.setDescription('API documentation for Nest course')
		.setVersion('1.0')
		.setContact('impuDEV Team', 'https://impudev.ru', 'impudev@gmail.com')
		.build()

	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('/docs', app, document)

	app.use(logger)

	await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
