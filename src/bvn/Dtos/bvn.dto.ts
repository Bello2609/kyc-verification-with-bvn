import { ApiProperty } from "@nestjs/swagger"
export class BvnDto{
    @ApiProperty()
    bvn_number: string
}