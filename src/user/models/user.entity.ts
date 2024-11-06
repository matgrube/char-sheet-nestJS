import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { CampaignEntity } from "src/campaing/models/campaign.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @ApiProperty({
        description: 'Primary key as UserId',
        example: 1
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'Name of a user',
        example: 'JohnDoe'
    })
    @Column({ unique: true })
    name: string;

    @ApiProperty({
        description: 'User email',
        example: 'example@mail.com'
    })
    @Column({ unique: true })
    email: string;

    @ApiProperty({
        description: 'User password',
        example: 'Redacted'
    })
    @Column()
    @Exclude()
    password: string;

    @ApiProperty({
        type: () => CampaignEntity,
        description: 'Campaigns owned by a user',
    })
    @OneToMany(() => CampaignEntity, campaign => campaign.owner)
    owned_campaigns: CampaignEntity[]
}