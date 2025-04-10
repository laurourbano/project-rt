// backend-rt/src/quadros/quadros.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quadro } from './quadro/quadro';

@Injectable()
export class QuadrosService {
    constructor(
        @InjectModel(Quadro.name) private quadrosRepository: Model<Quadro>,
    ) { }

    async findAll(): Promise<Quadro[]> {
        return this.quadrosRepository.find().exec();
    }

    async findOne(id: string): Promise<Quadro> {
        const quadro = await this.quadrosRepository.findById(id).exec();
        if (!quadro) {
            throw new NotFoundException(`Quadro com ID ${id} não encontrado`);
        }
        return quadro;
    }

    async create(quadro: Quadro): Promise<Quadro> {
        const createdQuadro = new this.quadrosRepository(quadro);
        return createdQuadro.save();
    }

    async update(id: string, updatedQuadro: Partial<Quadro>): Promise<Quadro> {
        if (!id || id === 'undefined') {
            throw new BadRequestException('ID inválido');
        }
        const updated = await this.quadrosRepository
            .findByIdAndUpdate(id, updatedQuadro, { new: true })
            .exec();
        if (!updated) {
            throw new NotFoundException(`Quadro com ID ${id} não encontrado`);
        }
        return updated;
    }

    async remove(id: string): Promise<boolean> {
        const result = await this.quadrosRepository.deleteOne({ _id: id }).exec();
        return result.deletedCount > 0;
    }
}