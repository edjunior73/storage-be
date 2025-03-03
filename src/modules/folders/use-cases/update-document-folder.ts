import { DocumentRepository } from '@modules/documents/document.repository'
import { Injectable, NotFoundException } from '@nestjs/common'

import { Folder } from '../folder.model'
import { FolderRepository } from '../folder.repository'

export interface UpdateDocumentFromFolderInput {
  userId: string
  documentId: string
  folderId: string
}
@Injectable()
export class UpdateDocumentFromFolderUseCase {
  constructor(
    private readonly documentRepository: DocumentRepository,
    private readonly folderRepository: FolderRepository,
  ) { }

  async execute({
    userId,
    documentId,
    folderId,
  }: UpdateDocumentFromFolderInput): Promise<Folder> {
    const [foundFolder, foundDocument] = await Promise.all([
      this.folderRepository.getById(folderId),
      this.documentRepository.getById(documentId),
    ])

    const foundDocumentsInFolder =
      await this.documentRepository.getManyByFolderId(folderId)

    if (
      foundDocumentsInFolder.some((doc) => doc.title === foundDocument.title)
    ) {
      throw new Error('Folder already has a document with the same title')
    }
    if (!foundFolder || foundFolder.userId !== userId) {
      throw new NotFoundException('Folder not found')
    }
    if (!foundDocument || foundDocument.userId !== userId) {
      throw new NotFoundException('Document not found')
    }

    return this.documentRepository.updateById(documentId, { folderId })
  }
}
