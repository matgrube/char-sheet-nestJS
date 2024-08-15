import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CampaignService } from "./campaign.service";
import { CampaignEntity } from "./models/campaign.entity";


@ApiTags('Campaign')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('campaign')
export class CampaignController {
    constructor(private readonly campaignService: CampaignService) {}

    @Get()
    @ApiOperation({
        summary: 'Get all campaigns',
        description: 'Returns a list of all campaigns',
    })
    @ApiOkResponse({
        type: CampaignEntity,
        isArray: true,
        description: 'List of created campaigns'
    })
    async getAllCampaigns(): Promise<CampaignEntity[]> {
        return await this.campaignService.getCampaigns();
    };
}