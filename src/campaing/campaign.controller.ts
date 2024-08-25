import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Post, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CampaignService } from "./campaign.service";
import { CampaignEntity } from "./models/campaign.entity";
import { CreateCampaignDto } from "./dto/create-campaing.dto";


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

    @ApiOperation({
        summary: 'Create new campaign',
        description: 'Create a new campaign for your players'
    })
    @ApiCreatedResponse({
        type: CampaignEntity,
        description: 'Created a new Campaing'
    })
    @ApiConflictResponse({
        description: 'Campaign with that name already exists'
    })
    @ApiBadRequestResponse({
        description: 'Creation of campaign failed'
    })
    @Post('create')
    @HttpCode(200)
    async createCampaign(@Body() body: CreateCampaignDto): Promise<CampaignEntity> {
        const createdCampaign = await this.campaignService.createCampaign(body);
        return createdCampaign;
    }
}