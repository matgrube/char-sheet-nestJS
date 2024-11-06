import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/user/models/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('campaign')
export class CampaignEntity {
    @ApiProperty({
        description: 'Primary key as CampaignId',
        example: 1
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'Campaign name',
        example: 'My SoL campaign',
    })
    @Column()
    name: string;

    @ApiProperty({
        type: () => UserEntity,
        description: 'Campaign GM id',
        example: 3
    })
    @ManyToOne(() => UserEntity, user => user.owned_campaigns)
    owner: UserEntity;
}