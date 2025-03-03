import { DocumentRepository } from '@modules/documents/document.repository'
import { ForbiddenException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { FolderRepository } from '../folder.repository'
import { DeleteDocumentFromFolderUseCase } from './delete-document-from-folder'

describe('DeleteDocumentFromFolderUseCase', () => {
  let useCase: DeleteDocumentFromFolderUseCase
  let documentRepository: DocumentRepository
  let folderRepository: FolderRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteDocumentFromFolderUseCase,
        {
          provide: DocumentRepository,
          useValue: {
            getById: jest.fn(),
            updateById: jest.fn(),
          },
        },
        {
          provide: FolderRepository,
          useValue: {
            getById: jest.fn(),
          },
        },
      ],
    }).compile()

    useCase = module.get<DeleteDocumentFromFolderUseCase>(
      DeleteDocumentFromFolderUseCase,
    )
    documentRepository = module.get<DocumentRepository>(DocumentRepository)
    folderRepository = module.get<FolderRepository>(FolderRepository)
  })

  it('should throw NotFoundException if the folder does not exist or belongs to another user', async () => {
    jest.spyOn(folderRepository, 'getById').mockResolvedValue(null)

    await expect(
      useCase.execute({
        userId: 'user1',
        documentId: 'doc1',
        folderId: 'folder1',
      }),
    ).rejects.toThrow(NotFoundException)
  })

  it('should throw NotFoundException if the folder belongs to another user', async () => {
    jest.spyOn(folderRepository, 'getById').mockResolvedValue({
      id: 'folder1',
      userId: 'user2',
      title: 'Test Folder',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await expect(
      useCase.execute({
        userId: 'user1',
        documentId: 'doc1',
        folderId: 'folder1',
      }),
    ).rejects.toThrow(NotFoundException)
  })

  it('should throw ForbiddenException if the document is not in the specified folder', async () => {
    jest.spyOn(folderRepository, 'getById').mockResolvedValue({
      id: 'folder1',
      userId: 'user1',
      title: 'Test Folder',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    jest.spyOn(documentRepository, 'getById').mockResolvedValue({
      id: 'doc1',
      folderId: 'folder2',
      title: 'Test Document',
      latestVersionId: 'version1',
      userId: 'user1',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await expect(
      useCase.execute({
        userId: 'user1',
        documentId: 'doc1',
        folderId: 'folder1',
      }),
    ).rejects.toThrow(ForbiddenException)
  })

  it('should remove the document from the folder and return true if everything is correct', async () => {
    jest.spyOn(folderRepository, 'getById').mockResolvedValue({
      id: 'folder1',
      userId: 'user1',
      title: 'Test Folder',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    jest.spyOn(documentRepository, 'getById').mockResolvedValue({
      id: 'doc1',
      folderId: 'folder1',
      title: 'Test Document',
      latestVersionId: 'version1',
      userId: 'user1',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    jest.spyOn(documentRepository, 'updateById').mockResolvedValue({
      id: 'doc1',
      folderId: null,
      title: 'Test Document',
      latestVersionId: 'version1',
      userId: 'user1',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const result = await useCase.execute({
      userId: 'user1',
      documentId: 'doc1',
      folderId: 'folder1',
    })

    expect(result).toBe(true)
  })
  it('should return false if the update fails', async () => {
    jest.spyOn(folderRepository, 'getById').mockResolvedValue({
      id: 'folder1',
      userId: 'user1',
      title: 'Test Folder',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    jest.spyOn(documentRepository, 'getById').mockResolvedValue({
      id: 'doc1',
      folderId: 'folder1',
      title: 'Test Document',
      latestVersionId: 'version1',
      userId: 'user1',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    jest.spyOn(documentRepository, 'updateById').mockResolvedValue(null)

    await expect(
      useCase.execute({
        userId: 'user1',
        documentId: 'doc1',
        folderId: 'folder1',
      }),
    ).resolves.toBe(true)
  })
})
