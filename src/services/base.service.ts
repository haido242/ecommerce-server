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

    public async get() {
        return this.Model.find();
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

}