import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { IsEmail } from 'class-validator';

export type UserDocument = UserEntity & Document;
@Schema()
export class UserEntity {
  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  companyId: string;

  @Prop({ required: true })
  roleId: string;

  @Prop({ default: Date.now })
  createDate: Date;

  @Prop({ default: Date.now })
  lastLogin: Date;
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);

UserEntitySchema.pre<UserEntity>('save', async function (next: Function) {
  this.password = await hash(this.password, 10);
  next();
});
