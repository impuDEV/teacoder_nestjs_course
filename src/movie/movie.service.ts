import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { MovieDto } from './dto/movie.dto'
import { Movie, MoviePoster } from '@prisma/client'

@Injectable()
export class MovieService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(dto: MovieDto): Promise<Movie> {
		const { title, releaseYear, imageUrl, actorIds } = dto

		const actors = await this.prismaService.actor.findMany({
			where: {
				id: { in: actorIds },
			},
		})

		if (!actors || !actors.length)
			throw new NotFoundException(`Один или нсколько актёров не найдены`)

		const movie = await this.prismaService.movie.create({
			data: {
				title,
				releaseYear,
				poster: imageUrl
					? {
							create: {
								url: imageUrl,
							},
						}
					: {},
				actors: {
					connect: actors.map((actor) => ({
						id: actor.id,
					})),
				},
			},
		})

		return movie
	}

	async findAll() {
		const movies = await this.prismaService.movie.findMany({
			where: {
				isAvailable: true,
			},
			orderBy: {
				cratedAt: 'desc',
			},
			select: {
				id: true,
				title: true,
				actors: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		})

		return movies
	}

	async findById(id: string): Promise<Movie> {
		const movie = await this.prismaService.movie.findUnique({
			where: {
				id,
			},
			include: {
				actors: true,
				poster: true,
				reviews: true,
			},
		})

		if (!movie || !movie.isAvailable)
			throw new NotFoundException('Фильм не найден')

		return movie
	}

	async update(id: string, dto: MovieDto): Promise<boolean> {
		const movie = await this.findById(id)

		const actors = await this.prismaService.actor.findMany({
			where: {
				id: { in: dto.actorIds },
			},
		})

		if (!actors || !actors.length)
			throw new NotFoundException(`Один или нсколько актёров не найдены`)

		await this.prismaService.movie.update({
			where: {
				id: movie.id,
			},
			data: {
				title: dto.title,
				releaseYear: dto.releaseYear,
				poster: dto.imageUrl
					? {
							create: {
								url: dto.imageUrl,
							},
						}
					: {},
				actors: {
					connect: actors.map((actor) => ({
						id: actor.id,
					})),
				},
			},
		})

		return true
	}

	async delete(id: string): Promise<string> {
		const movie = await this.findById(id)

		await this.prismaService.movie.delete({
			where: {
				id,
			},
		})

		return movie.id
	}
}
