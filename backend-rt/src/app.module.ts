import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuadrosModule } from './quadros/quadros.module';

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGODB_URI!),
        QuadrosModule,
    ],
})
export class AppModule { }
