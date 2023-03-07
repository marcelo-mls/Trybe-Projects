import { Model, models, Schema, model } from 'mongoose';

export default abstract class AbstractODM<Generic> {
  protected model: Model<Generic>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: Generic): Promise<Generic> {
    return this.model.create({ ...obj });
  }

  public async getAll(): Promise<Generic[] | []> {
    return this.model.find();
  }

  public async getOneById(id: string): Promise<Generic | null> {
    return this.model.findById(id);
  }

  public async update(id: string, car: Partial<Generic>): Promise<Generic | null> {
    return this.model.findByIdAndUpdate({ _id: id }, { ...car });
  }
}
