import {AppDataSource} from "../../data-source";
import {Favourite} from "../models/favourite.entity";
import {User} from "../models/user.entity";
import {Recipe} from "../models/recipe.entity";
import {ApiError} from "../exceptions/api-error";

class FavouriteService {
	async create(userId: number, recipeId: number) {
		const user = await AppDataSource.getRepository(User).findOneBy({ id: userId })
		const recipe = await AppDataSource.getRepository(Recipe).findOneBy({ id: recipeId })

		if (!user)
			throw ApiError.UnauthorizedError()

		if (!recipe)
			throw ApiError.NotFound()

		const existingFavourite = await AppDataSource.getRepository(Favourite)
			.findOneBy({ user: user, recipe: recipe })

		if (existingFavourite)
			throw ApiError.Conflict("This recipe already has been added to favourites")

		const favourite = new Favourite()
		favourite.user = user
		favourite.recipe = recipe

		const result = await AppDataSource.getRepository(Favourite).save(favourite)
		return result
	}

	async get() {

	}

	async update() {

	}

	async delete(userId: number, recipeId: number) {
		const existingFavourite = await AppDataSource.getRepository(Favourite)
			.findOneBy({ user: { id: userId }, recipe: { id: recipeId }})

		if (!existingFavourite)
			throw ApiError.NotFound()

		const result = await AppDataSource.getRepository(Favourite).delete(existingFavourite.id)
		return result
	}
}

export default new FavouriteService()