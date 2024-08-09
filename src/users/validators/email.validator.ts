import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'customEmail', async: false })
export class CustomEmailValidator implements ValidatorConstraintInterface {
  validate(email: string, args: ValidationArguments) {
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    return emailRegex.test(email); 
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email is not valid according to format!';
  }
}
