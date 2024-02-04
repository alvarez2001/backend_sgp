module.exports = (
  entityNameLowerCase,
  entityNameCamelCase,
) => `import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ${entityNameCamelCase}ReadDocument = HydratedDocument<${entityNameCamelCase}Read>;

@Schema({ collection: '${entityNameLowerCase}s' })
export class ${entityNameCamelCase}Read {
  @Prop()
  id: number;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const ${entityNameCamelCase}ReadSchema = SchemaFactory.createForClass(${entityNameCamelCase}Read);
`;
