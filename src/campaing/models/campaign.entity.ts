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
        description: 'Campaign GM id',
        example: 3
    })
    @Column()
    owner_id: number;

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn({ name: 'owner_id' })
    user: UserEntity;

    @Column()
    players_ids: number[];

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn({ name: 'players_ids' })
    players: UserEntity[]
}