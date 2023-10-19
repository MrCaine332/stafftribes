import {CreateRecipeBody} from "../types/bodies";
import {Step} from "../models/step.entity";
import {Recipe} from "../models/recipe.entity";
import {Ingredient} from "../models/ingredient.entity";
import {AppDataSource} from "../../data-source";
import {User} from "../models/user.entity";
import {Topic} from "../models/topic.entity";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";
import {FindOneOptions, Like} from "typeorm";
import {RecipesParams} from "../types/params";
import {ApiError} from "../exceptions/api-error";
import {RecipeUpdatable} from "../dtos/recipe-updatable";
import {UserUpdatable} from "../dtos/user-updatable";
import {isNullOrWhitespace} from "../helpers/isNullOrWhitespace";

const recipeFindOptions: Partial<FindOneOptions<Recipe> | FindManyOptions<Recipe>> = {
	relations: {
		steps: true,
		ingredients: true,
		author: true,
	},
	select: {
		author: {
			id: true,
			username: true,
			firstName: true,
			lastName: true
		},
	},
}

class RecipeService {
	async create(body: CreateRecipeBody) {
		const steps: Step[] = []
		body.steps.map((step) => {
			const newStep = new Step()
			newStep.stepName = step.stepName
			newStep.stepDescription = step.stepDescription
			steps.push(newStep)
		})
		const ingredients: Ingredient[] = []
		body.ingredients.map((ingredient) => {
			const newIngredient = new Ingredient()
			newIngredient.ingredientName = ingredient.ingredientName
			newIngredient.ingredientAmount = ingredient.ingredientAmount
			ingredients.push(newIngredient)
		})

		const recipe = new Recipe()
		recipe.title = body.title
		recipe.description = body.description
		recipe.cookingTime = body.cookingTime
		recipe.difficulty = body.difficulty
		recipe.topicId = body.topicId
		recipe.steps = steps
		recipe.ingredients = ingredients
		recipe.authorId = body.userId

		recipe.previewImageLink = body.previewImageLink
		/** TODO: Add media upload with images/videos */

		const promises: Promise<Step | Ingredient>[] = []
		steps.map((step) => {
			promises.push(AppDataSource.getRepository(Step).save(step))
		})
		ingredients.map((ingredient) => {
			promises.push(AppDataSource.getRepository(Ingredient).save(ingredient))
		})

		await Promise.allSettled(promises)
		const result = await AppDataSource.getRepository(Recipe).save(recipe)
		return result
	}

	async getTodaySelection() {
		const recipes = await this.getRecipesWithQuery()
			.orderBy("RAND()")
			.take(5)
			.getMany()

		return recipes
	}

	async getNewest() {
		const recipes = await AppDataSource.getRepository(Recipe).find({
			...recipeFindOptions,
			order: {id: "DESC"},
			take: 3
		})

		return recipes
	}

	async getFeatured() {
		const easyRecipes = this.getRecipesWithQuery()
			.where('recipe.difficulty = "EASY"')
			.orderBy("RAND()")
			.take(3)
			.getMany()
		const mediumRecipes = this.getRecipesWithQuery()
			.where('recipe.difficulty = "MEDIUM"')
			.orderBy("RAND()")
			.take(3)
			.getMany()
		const hardRecipes = this.getRecipesWithQuery()
			.where('recipe.difficulty = "HARD"')
			.orderBy("RAND()")
			.take(3)
			.getMany()

		const result = await Promise.all([easyRecipes, mediumRecipes, hardRecipes])
		const featuredRecipes = {
			easy: result[0],
			medium: result[1],
			hard: result[2]
		}

		return featuredRecipes

	}

	async get(params: RecipesParams) {
		const options: FindManyOptions<Recipe> = {
			...recipeFindOptions,
			where: [{
				topic: { id: params.topicId || undefined },
				difficulty: params.difficulty || undefined,
				title: Like(`%${params.search || ""}%`)
			},
			{
				topic: { id: params.topicId || undefined },
				difficulty: params.difficulty || undefined,
				description: Like(`%${params.search || ""}%`)
			}],
			skip: (params._limit * params._page) - params._limit,
			take: params._limit,
		}
		const recipes = await AppDataSource.getRepository(Recipe).find(options)
		return recipes
	}

	async getOne(id: number) {
		const recipe = await AppDataSource.getRepository(Recipe).findOne({
			where: { id: id },
			relations: {
				...recipeFindOptions.relations,
				topic: true
			},
			select: {
				...recipeFindOptions.select,
				topic: {
					id: true,
					topicName: true
				}
			},
		})

		return recipe
	}

	async update(id: number, body: any, userId: number) {
		const recipe = await AppDataSource.getRepository(Recipe).findOneBy({ id: id })
		if (!recipe)
			throw ApiError.NotFound()

		if (recipe.author.id !== userId)
			throw ApiError.Forbidden()

		const updatable = new RecipeUpdatable(body)
	}

	getRecipesWithQuery() {
		return AppDataSource
			.getRepository(Recipe)
			.createQueryBuilder("recipe")
			.select()
			.leftJoin("recipe.steps", "ingredients")
			.leftJoin("recipe.ingredients", "steps")
			.leftJoin("recipe.author", "user")
			.addSelect([
				'user.id',
				'user.username',
				'user.firstName',
				'user.lastName'])
			.orderBy("RAND()")
	}
}

export default new RecipeService()