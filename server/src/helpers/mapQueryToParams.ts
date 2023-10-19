import {ParsedQs} from "qs";
import {Difficulties, PaginationParams, RecipesParams} from "../types/params";

export const mapQueryToPaginationParams = (query: ParsedQs) => {
	const params: PaginationParams = {
		_limit: !isNaN(Number(query._limit)) ? Number(query._limit) : 10,
		_page: !isNaN(Number(query._page)) ? Number(query._page) : 1,
	}

	return params
}

export const mapQueryToRecipesParams = (query: ParsedQs) => {
	const topicId = validateAsNumberOrNull(query.topicId)
	const authorId = validateAsNumberOrNull(query.authorId)

	const difficulties = ["EASY", "MEDIUM", "HARD"]

	const paginationParams = mapQueryToPaginationParams(query)

	const params: RecipesParams = {
		search: query.search ? query.search as string : "",
		difficulty: difficulties.includes(String(query.difficulty)) ? query.difficulty as Difficulties : null,
		topicId: topicId,
		authorId: authorId,
		_limit: paginationParams._limit,
		_page: paginationParams._page
	}

	return params
}

const validateAsNumberOrNull = (param: any, additionalValidation?: (param: number) => number) => {
	let validatedParam = (param && !isNaN(Number(param))) ? Number(param) : null
	if (!validatedParam)
		return validatedParam

	if (additionalValidation)
		validatedParam = additionalValidation(param)

	return validatedParam
}