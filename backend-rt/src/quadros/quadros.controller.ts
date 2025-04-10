import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { QuadrosService } from './quadros.service';
import { Quadro } from './quadro/quadro';

@Controller('quadros')
export class QuadrosController {
    constructor(private readonly quadrosService: QuadrosService) { }

    @Get()
    async findAll(): Promise<Quadro[]> {
        return this.quadrosService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Quadro> {
        return this.quadrosService.findOne(id);
    }

    @Post()
    async create(@Body() quadro: Quadro): Promise<Quadro> {
        return this.quadrosService.create(quadro);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() quadro: Partial<Quadro>): Promise<Quadro> {
        return this.quadrosService.update(id, quadro);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<boolean> {
        return this.quadrosService.remove(id);
    }
}