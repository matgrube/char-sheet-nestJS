import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCampaignDto {
    @ApiProperty({
        description: 'Campaing name',
        example: 'My new campaign'
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Id of campaing owner',
        example: 1
    })
    @IsNotEmpty()
    owner_id: number
}