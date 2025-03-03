import { DocumentModule } from '@modules/documents'
import { UserModule } from '@modules/users'
import { Module } from '@nestjs/common'

import { FolderController } from './folder.controller'
import { FolderRepository } from './folder.repository'
import { FolderService } from './folder.service'
import {
  DeleteDocumentFromFolderUseCase,
  GetUserManyFoldersUseCase,
  UpdateDocumentFromFolderUseCase,
} from './use-cases'

const useCases = [
  GetUserManyFoldersUseCase,
  DeleteDocumentFromFolderUseCase,
  UpdateDocumentFromFolderUseCase,
]

@Module({
  imports: [UserModule, DocumentModule],
  controllers: [FolderController],
  exports: [FolderService, FolderRepository],
  providers: [FolderService, FolderRepository, ...useCases],
})
export class FolderModule { }
