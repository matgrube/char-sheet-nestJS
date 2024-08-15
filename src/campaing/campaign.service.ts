import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CampaignEntity } from "./models/campaign.entity";
import { Repository } from "typeorm";


@Injectable()
export class CampaignService {
    constructor(
        @InjectRepository(CampaignEntity)
        private readonly campaignRepository: Repository<CampaignEntity>
    ) {}

    async getCampaigns(): Promise<CampaignEntity[]> {
        return await this.campaignRepository.find();
    };
}