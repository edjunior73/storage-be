import { Injectable } from '@nestjs/common'

import { Folder } from './folder.model'
import { FolderRepository } from './folder.repository'
import { CreateFolderInput } from './folder.repository'
import {
  DeleteDocumentFromFolderUseCase,
  GetUserManyFoldersUseCase,
  UpdateDocumentFromFolderInput,
  UpdateDocumentFromFolderUseCase,
} from './use-cases'
import { DeleteDocumentFromFolderInput } from './use-cases/delete-document-from-folder'

@Injectable()
export class FolderService {
  constructor(
    private readonly getUserManyFoldersUseCase: GetUserManyFoldersUseCase,
    private readonly deleteDocumentFromFolderUseCase: DeleteDocumentFromFolderUseCase,
    private readonly updateUserDocumentFolderUseCase: UpdateDocumentFromFolderUseCase,
    private readonly folderRepository: FolderRepository,
  ) { }

  async getUserManyFolder(userId: string): Promise<Folder[]> {
    return this.getUserManyFoldersUseCase.execute(userId)
  }

  async deleteDocumentFromFolder(
    data: DeleteDocumentFromFolderInput,
  ): Promise<boolean> {
    return this.deleteDocumentFromFolderUseCase.execute(data)
  }

  async updateUserDocumentFolder(
    data: UpdateDocumentFromFolderInput,
  ): Promise<Folder> {
    return this.updateUserDocumentFolderUseCase.execute(data)
  }

  async create(data: CreateFolderInput): Promise<Folder> {
    return this.folderRepository.create(data)
  }
}
