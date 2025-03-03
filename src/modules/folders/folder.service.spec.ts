import { Test, TestingModule } from '@nestjs/testing'

import { Folder } from './folder.model'
import { FolderRepository } from './folder.repository'
import { FolderService } from './folder.service'
import { DeleteDocumentFromFolderUseCase } from './use-cases/delete-document-from-folder'
import { GetUserManyFoldersUseCase } from './use-cases/get-user-many-folders'
import { UpdateDocumentFromFolderUseCase } from './use-cases/update-document-folder'

describe('FolderService', () => {
  let service: FolderService
  let folderRepository: FolderRepository
  let getUserManyFoldersUseCase: GetUserManyFoldersUseCase
  let deleteDocumentFromFolderUseCase: DeleteDocumentFromFolderUseCase
  let updateDocumentFromFolderUseCase: UpdateDocumentFromFolderUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FolderService,
        {
          provide: FolderRepository,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: GetUserManyFoldersUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteDocumentFromFolderUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateDocumentFromFolderUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<FolderService>(FolderService)
    folderRepository = module.get<FolderRepository>(FolderRepository)
    getUserManyFoldersUseCase = module.get<GetUserManyFoldersUseCase>(
      GetUserManyFoldersUseCase,
    )
    deleteDocumentFromFolderUseCase =
      module.get<DeleteDocumentFromFolderUseCase>(
        DeleteDocumentFromFolderUseCase,
      )
    updateDocumentFromFolderUseCase =
      module.get<UpdateDocumentFromFolderUseCase>(
        UpdateDocumentFromFolderUseCase,
      )
  })

  it('should retrieve user folders', async () => {
    const mockFolders: Folder[] = [
      {
        id: 'folder1',
        userId: 'user1',
        title: 'Test Folder',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    jest
      .spyOn(getUserManyFoldersUseCase, 'execute')
      .mockResolvedValue(mockFolders)

    await expect(service.getUserManyFolder('user1')).resolves.toEqual(
      mockFolders,
    )
  })

  it('should delete a document from a folder', async () => {
    jest
      .spyOn(deleteDocumentFromFolderUseCase, 'execute')
      .mockResolvedValue(true)
    await expect(
      service.deleteDocumentFromFolder({
        userId: 'user1',
        documentId: 'doc1',
        folderId: 'folder1',
      }),
    ).resolves.toBe(true)
  })

  it('should update a document folder', async () => {
    const updatedFolder: Folder = {
      id: 'folder1',
      userId: 'user1',
      title: 'Updated Folder',
      createdAt: undefined,
      updatedAt: undefined,
    }
    jest
      .spyOn(updateDocumentFromFolderUseCase, 'execute')
      .mockResolvedValue(updatedFolder)

    await expect(
      service.updateUserDocumentFolder({
        userId: 'user1',
        documentId: 'doc1',
        folderId: 'folder1',
      }),
    ).resolves.toEqual(updatedFolder)
  })

  it('should create a new folder', async () => {
    const newFolder: Folder = {
      id: 'folder2',
      userId: 'user1',
      title: 'New Folder',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    jest.spyOn(folderRepository, 'create').mockResolvedValue(newFolder)

    await expect(
      service.create({
        userId: 'user1',
        title: 'New Folder',
        updatedAt: new Date(),
      }),
    ).resolves.toEqual(newFolder)
  })
})
