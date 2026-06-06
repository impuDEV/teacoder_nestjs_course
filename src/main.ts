import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { logger } from './common/middlewares/logger.middleware'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { AllExceptionsFilter } from './common/filters/all-exception.filter'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(new ValidationPipe())

	app.useGlobalInterceptors(new ResponseInterceptor())

	app.useGlobalFilters(new AllExceptionsFilter())

	app.use(logger)

	await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
