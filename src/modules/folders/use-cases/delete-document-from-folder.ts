import { DocumentRepository } from '@modules/documents/document.repository'
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { FolderRepository } from '../folder.repository'

export interface DeleteDocumentFromFolderInput {
  userId: string
  documentId: string
  folderId: string
}
@Injectable()
export class DeleteDocumentFromFolderUseCase {
  constructor(
    private readonly documentRepository: DocumentRepository,
    private readonly folderRepository: FolderRepository,
  ) { }

  async execute({
    userId,
    documentId,
    folderId,
  }: DeleteDocumentFromFolderInput): Promise<boolean> {
    const [foundFolder, foundDocument] = await Promise.all([
      this.folderRepository.getById(folderId),
      this.documentRepository.getById(documentId),
    ])
    if (!foundFolder || foundFolder.userId !== userId) {
      throw new NotFoundException('Folder not found')
    }
    if (foundDocument.folderId !== folderId) {
      throw new ForbiddenException('Document if not in this folder')
    }

    return !!this.documentRepository.updateById(documentId, { folderId: null })
  }
}
