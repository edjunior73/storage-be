import { Test, TestingModule } from '@nestjs/testing'

import { Folder } from '../folder.model'
import { FolderRepository } from '../folder.repository'
import { GetUserManyFoldersUseCase } from './get-user-many-folders'

describe('GetUserManyFoldersUseCase', () => {
  let useCase: GetUserManyFoldersUseCase
  let folderRepository: FolderRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserManyFoldersUseCase,
        {
          provide: FolderRepository,
          useValue: {
            getManyByUserId: jest.fn(),
          },
        },
      ],
    }).compile()

    useCase = module.get<GetUserManyFoldersUseCase>(GetUserManyFoldersUseCase)
    folderRepository = module.get<FolderRepository>(FolderRepository)
  })

  it('should return an array of folders for the given user', async () => {
    const mockFolders: Folder[] = [
      {
        id: 'folder1',
        userId: 'user1',
        title: 'Folder 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'folder2',
        userId: 'user1',
        title: 'Folder 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    jest
      .spyOn(folderRepository, 'getManyByUserId')
      .mockResolvedValue(mockFolders)

    await expect(useCase.execute('user1')).resolves.toEqual(mockFolders)
  })
  it('should return an empty array if the user has no folders', async () => {
    jest.spyOn(folderRepository, 'getManyByUserId').mockResolvedValue([])

    await expect(useCase.execute('user1')).resolves.toEqual([])
  })
})
