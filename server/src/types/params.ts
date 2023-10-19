export type Difficulties  = 'EASY' | 'MEDIUM' | 'HARD' | null

export type PaginationParams = {
	_page: number
	_limit: number
}

export type RecipesParams = {
	search: string | null
	topicId: number | null
	authorId: number | null
	difficulty: Difficulties
} & PaginationParams