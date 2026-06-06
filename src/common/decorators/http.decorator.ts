import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export const ClientIp = createParamDecorator(
	(_: string, ctx: ExecutionContext) => {
		const request: Request = ctx.switchToHttp().getRequest()

		const ip = Array.isArray(request.headers['cf-connecting-ip'])
			? request.headers['cf-connecting-ip'][0]
			: request.headers['cf-connecting-ip'] ||
				(typeof request.headers['x-forwarded-for'] === 'string'
					? request.headers['x-forwarded-for'].split(',')[0]
					: request.ip)

		return ip
	},
)
