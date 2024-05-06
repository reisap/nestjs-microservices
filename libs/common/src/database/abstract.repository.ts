import {FilterQuery, Model, Types, UpdateQuery} from "mongoose"
import {AbstractDocument} from "./abstract.schema"
import {Logger, NotFoundException} from "@nestjs/common"
//import {Logger} from "@nestjs/common"
import {CreateIndexesOptions} from "mongodb"

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    protected abstract readonly logger: Logger
    constructor(protected readonly model: Model<TDocument>) {}

    async create(document: Omit<TDocument, "_id">): Promise<TDocument> {
        const createdDocument = await new this.model({
            ...document,
            _id: new Types.ObjectId(),
        })

        const result = (await createdDocument.save()).toJSON()

        if (!result) {
            this.logger.warn("Document can not save", document)
            throw new NotFoundException("Document not found")
            //return null
        }
        return document as TDocument
    }

    async findone(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOne(filterQuery, {}, {lean: true})

        if (!document) {
            this.logger.warn("Document not found with fillterQuery", filterQuery)
            throw new NotFoundException("Document not found")
            // return null
        }
        return document as TDocument
    }

    async findOneAndUpdate(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOneAndUpdate(filterQuery, update, {
            lean: true,
            new: true,
        })

        if (!document) {
            this.logger.warn("Document not found with fillterQuery", filterQuery)
            throw new NotFoundException("Document not found")
            //return null
        }
        return document as TDocument
    }

    async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
        return await this.model.find(filterQuery).lean<TDocument[]>(true)
        // const document = await this.model.find(filterQuery, {}, {lean: true})
        // return document as unknown as TDocument
    }

    async findOneAndDelete(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOneAndDelete(filterQuery).lean<TDocument>(true)
        if (!document) {
            this.logger.warn("Document not found with fillterQuery", filterQuery)
            throw new NotFoundException("Document not found")
            //return null
        }
        return document as TDocument
        //return await this.model.findOneAndDelete(fillterQuery, {lean: true})
    }

    async createIndex(options: CreateIndexesOptions) {
        return this.model.createIndexes(options as any)
    }
}
