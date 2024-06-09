// create base 
import { Document, Model } from 'mongoose';

export default class BaseService {
    protected Model: Model<Document>;

    constructor(Model: Model<Document>) {
        this.Model = Model;
    }

    public async create(data: any) {
        return this.Model.create(data);
    }

    public async get(page: number, limit: number, sort: string, order: number) {
        const skip = (page - 1) * limit;
        const data = await this.Model.find().skip(skip).limit(limit).sort({ [sort]: order } as any);
        const total = await this.Model.countDocuments();
        return { data, total };
    }

    public async getById(id: string) {
        return this.Model.findById(id);
    }

    public async update(id: string, data: any) {
        return this.Model.findByIdAndUpdate(id, data);
    }

    public async delete(id: string) {
        return this.Model.findByIdAndDelete(id);
    }

    public async getByArrayIds(ids: string[]) {
        return this.Model.find({ _id: { $in: ids } });
    }

}