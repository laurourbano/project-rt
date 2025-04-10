import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Quadro extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    local: string;

    @Prop({ required: true })
    situacao: string;

    @Prop({ required: true })
    julgamento: string;

    @Prop({ default: 'light' })
    color: string;
}

export const QuadroSchema = SchemaFactory.createForClass(Quadro);