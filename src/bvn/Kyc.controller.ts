import { Controller, Post, Req, Res, Request, Response, Body } from '@nestjs/common';
import { KycService } from './Kyc.service';
import { BvnDto } from './Dtos/bvn.dto';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';


@ApiTags("User")
@ApiSecurity('x-api-key') // Matches the security name in Swagger config
@ApiSecurity('AppId') 
@Controller('kyc')
export class KycController {
    constructor(private readonly kycService: KycService){}
    @Post('bvn')
    async lookup_bvn_advance(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
        @Body() bvnDto: BvnDto
    ){
        return await this.kycService.bvnAdvanced(req, res, bvnDto.business_id, bvnDto)
    }
}
