import { Document } from '@modules/documents'
import { DocumentRepository } from '@modules/documents/document.repository'
import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { Folder } from '../folder.model'
import { FolderRepository } from '../folder.repository'
import { UpdateDocumentFromFolderUseCase } from './update-document-folder'

describe('UpdateDocumentFromFolderUseCase', () => {
  let useCase: UpdateDocumentFromFolderUseCase
  let documentRepository: DocumentRepository
  let folderRepository: FolderRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateDocumentFromFolderUseCase,
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

    useCase = module.get<UpdateDocumentFromFolderUseCase>(
      UpdateDocumentFromFolderUseCase,
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

  it('should throw NotFoundException if the document does not exist or belongs to another user', async () => {
    jest.spyOn(folderRepository, 'getById').mockResolvedValue({
      id: 'folder1',
      userId: 'user1',
      title: 'Folder 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    jest.spyOn(documentRepository, 'getById').mockResolvedValue(null)

    await expect(
      useCase.execute({
        userId: 'user1',
        documentId: 'doc1',
        folderId: 'folder1',
      }),
    ).rejects.toThrow(NotFoundException)
  })

  it('should update the document folder and return the updated folder', async () => {
    const mockFolder: Folder = {
      id: 'folder1',
      userId: 'user1',
      title: 'Folder 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const mockDocument: Document = {
      id: 'doc1',
      userId: 'user1',
      title: 'Document 1',
      latestVersionId: 'version1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    jest.spyOn(folderRepository, 'getById').mockResolvedValue(mockFolder)
    jest.spyOn(documentRepository, 'getById').mockResolvedValue(mockDocument)
    jest
      .spyOn(documentRepository, 'updateById')
      .mockResolvedValue(mockDocument)

    await expect(
      useCase.execute({
        userId: 'user1',
        documentId: 'doc1',
        folderId: 'folder1',
      }),
    ).resolves.toEqual(mockDocument)
  })
})
