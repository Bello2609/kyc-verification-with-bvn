import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
// api.service.ts
@Injectable()
export class ApiService {
  private readonly baseURL = configService.get('DOJA_API_BASE_URL');
  private header = {
    'AppId': configService.get('DOJAH_APP_ID'),
    'Authorization': configService.get('DOJAH_API_KEY'),
  };

  async fetchBVNData(bvn: string): Promise<any> {
    console.log(this.header.AppId, this.header.Authorization);
    try {
      const response = await axios.get(
        `${this.baseURL}/bvn/advance?bvn=${bvn}`,
        { headers: this.header }
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}