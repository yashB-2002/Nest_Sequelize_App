import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength, MaxLength, IsArray, ValidateNested, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { CustomEmailValidator } from '../validators/email.validator';
import { BooleanField, ToBoolean } from '../validators/boolean.decorator';

class AddressDto {
  @IsString()
  @IsNotEmpty()
  addressLine1: string;

  @IsString()
  @IsOptional()
  addressLine2?: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(10)
  pincode: string;
}

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  role:string

  @IsString()
  @IsNotEmpty()
  password:string


  @IsEmail()
  @IsNotEmpty()
  @Validate(CustomEmailValidator)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  phonenumber: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsBoolean()
  @IsNotEmpty()
  @ToBoolean()
  isActive: boolean;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsArray()
  @IsString({ each: true })
  hobbies: string[];
}
