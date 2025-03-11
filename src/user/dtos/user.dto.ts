import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDto{
    @ApiProperty()
    business_id: string;

    @ApiProperty()
    business_name: string;

    @ApiProperty()
    wallet: number;
}
