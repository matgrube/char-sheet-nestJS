import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/user/models/user.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


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
    @OneToMany(() => UserEntity, user => user.id, { onDelete: 'DEFAULT' })
    @JoinColumn({ name: 'owner_id' })
    user: UserEntity;

    @Column()
    owner_id: number;
}