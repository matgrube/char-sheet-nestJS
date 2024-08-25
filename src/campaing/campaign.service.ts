import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CampaignEntity } from "./models/campaign.entity";
import { Repository } from "typeorm";
import { CreateCampaignDto } from "./dto/create-campaing.dto";


@Injectable()
export class CampaignService {
    constructor(
        @InjectRepository(CampaignEntity)
        private readonly campaignRepository: Repository<CampaignEntity>
    ) {}

    async getCampaigns(): Promise<CampaignEntity[]> {
        return await this.campaignRepository.find();
    };

    async createCampaign(dto: CreateCampaignDto): Promise<CampaignEntity> {
        const { ...campaignDetails } = dto;

        try {
            const newCampaign = this.campaignRepository.create(campaignDetails);
            await this.campaignRepository.save(newCampaign);
            return newCampaign;
        } catch (error) {
            console.error(error);
        }

    }
}