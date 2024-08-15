import { TypeOrmModule } from "@nestjs/typeorm";
import { CampaignEntity } from "./models/campaign.entity";
import { Module } from "@nestjs/common";
import { CampaignController } from "./campaign.controller";
import { CampaignService } from "./campaign.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([CampaignEntity])
    ],
    controllers: [ CampaignController ],
    providers: [ CampaignService ]
})
export class CampaignModule {}