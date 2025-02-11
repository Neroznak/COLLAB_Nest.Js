import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsJson(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isJson',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    try {
                        JSON.parse(value); // Проверка, что это валидный JSON
                        return true;
                    } catch (e) {
                        return false;
                    }
                },
            },
        });
    };
}
