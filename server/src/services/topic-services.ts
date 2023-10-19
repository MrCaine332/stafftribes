import {Topic} from "../models/topic.entity";
import {AppDataSource} from "../../data-source";
import {ApiError} from "../exceptions/api-error";

class TopicService {
	async create(topicName: string) {
		const topic = new Topic()
		topic.topicName = topicName
		const result = await AppDataSource.getRepository(Topic).save(topic)
		return result
	}

	async get() {
		const topics = await AppDataSource.getRepository(Topic).find()
		return topics
	}

	async update(id: number, body: Partial<Topic>) {
		const topic = await AppDataSource.getRepository(Topic).findOneBy({ id: id })
		if (!topic)
			throw ApiError.NotFound()

		const { topicName } = body
		if (topicName) {
			topic.topicName = topicName
			await AppDataSource.getRepository(Topic).save(topic)
		}
	}

	async delete(id: number) {
		const deletedTopic = await AppDataSource.getRepository(Topic).delete(id)
		return deletedTopic
	}
}

export default new TopicService()