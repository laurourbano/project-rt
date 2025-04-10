import { Module } from '@nestjs/common';
import { QuadrosController } from './quadros.controller';
import { QuadrosService } from './quadros.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuadroSchema } from './quadro/quadro';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Quadro', schema: QuadroSchema },
        ])
    ],
    controllers: [QuadrosController],
    providers: [QuadrosService]
})
export class QuadrosModule { }
