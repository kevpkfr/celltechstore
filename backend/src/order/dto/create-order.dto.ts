import { Type } from "class-transformer";
import { IsUUID, IsNumber, IsInt, Min, IsString, IsArray, ArrayMinSize, ValidateNested } from "class-validator";

export class ProductDto {

    @IsUUID()
    id: string;
  
    @IsNumber()
    @IsInt()
    @Min(1)
    quantity: number;
  }
  
  export class CreateOrderDto {
    
    @IsString()
    readonly adress: string;
  
    @IsString()
    readonly date: string;
  
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => ProductDto)
    readonly products: ProductDto[];
  }
  
