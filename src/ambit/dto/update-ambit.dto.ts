import { PartialType } from '@nestjs/mapped-types';
import { CreateAmbitDto } from './create-ambit.dto';


export class UpdateAmbitDto extends PartialType(CreateAmbitDto) {
}
