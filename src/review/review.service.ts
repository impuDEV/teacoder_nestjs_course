import { Injectable } from '@nestjs/common'

@Injectable()
export class ReviewService {
	// constructor(
	// 	@InjectRepository(ReviewEntity)
	// 	private readonly reviewRepository: Repository<ReviewEntity>,
	// 	private readonly movieService: MovieService,
	// ) {}
	//
	// async create(dto: CreateReviewDto): Promise<ReviewEntity> {
	// 	const { text, rating, movieId } = dto
	// 	const movie = await this.movieService.findById(movieId)
	//
	// 	const review = this.reviewRepository.create({ text, rating, movie })
	//
	// 	return await this.reviewRepository.save(review)
	// }
}
