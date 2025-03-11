import { Controller, Post, Req, Res, Request, Response, Body } from '@nestjs/common';
import { KycService } from './Kyc.service';
import { BvnDto } from './Dtos/bvn.dto';
@Controller('kyc')
export class KycController {
    constructor(private readonly kycService: KycService){}
    @Post('bvn')
    async lookup_bvn_advance(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
        @Body() bvnDto: BvnDto, id: string,
    ){
        return await this.kycService.bvnAdvanced(req, res, "4", bvnDto)
    }
}
