import { UserEntity } from "./models/user.entity"
import { UserService } from "./user.service";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

describe('User service', () => {
    const mockUser = new UserEntity();
    
    let service: UserService;

    const mockUserRepository = {
        find: jest.fn(() => [mockUser]),
        createQueryBuilder: jest.fn(() => ({
            where: jest.fn().mockReturnThis()
        })),
        create: jest.fn(() => mockUser)
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: mockUserRepository,
                },
            ]
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('Should be defined', () => {
        expect(service).toBeDefined();
    })


})