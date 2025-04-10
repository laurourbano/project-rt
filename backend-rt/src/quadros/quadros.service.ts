import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quadro } from './quadro/quadro';
import { Model } from 'mongoose';

@Injectable()
export class QuadrosService {
    constructor(
        @InjectModel(Quadro.name) private quadroModel: Model<Quadro>
    ) { }

    async findAll(): Promise<Quadro[]> {
        return this.quadroModel.find().exec();
    }

    async findOne(id: string): Promise<Quadro> {
        const quadro = await this.quadroModel.findById(id).exec();
        if (!quadro) {
            throw new BadRequestException('Quadro não encontrado.');
        }
        return quadro;
    }

    async create(quadro: Quadro): Promise<Quadro> {
        const newQuadro = new this.quadroModel(quadro);
        return newQuadro.save();
    }

    async update(id: string, updatedQuadro: Partial<Quadro>): Promise<Quadro> {
        const quadro = await this.quadroModel.findByIdAndUpdate(id, updatedQuadro, { new: true }).exec();
        if (!quadro) {
            throw new BadRequestException('Quadro nao encontrado.');
        }
        return quadro;
    }

    async remove(id: string): Promise<boolean> {
        const result = await this.quadroModel.deleteOne({ _id: id }).exec();
        return result.deletedCount > 0;
    }

}
