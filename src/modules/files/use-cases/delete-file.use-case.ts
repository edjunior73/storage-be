import { DocumentService } from '@modules/documents'
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { FileRepository } from '../file.repository'

export interface UploadFileArgs {
  fileId: string
}

@Injectable()
export class DeleteFileUseCase {
  constructor(
    @Inject(forwardRef(() => DocumentService))
    private readonly documentService: DocumentService,
    private readonly fileRepository: FileRepository,
  ) { }

  async execute({ fileId }: UploadFileArgs): Promise<boolean> {
    const foundFile = await this.fileRepository.getById(fileId)

    if (!foundFile) throw new NotFoundException('File not found')

    const documentFiles = await this.fileRepository.getByDocumentId(
      foundFile.documentId,
    )

    const deletedFile = await this.fileRepository.delete(
      documentFiles.map((f) => f.id),
    )
    if (documentFiles.length <= 1) {
      await this.documentService.deleteById(foundFile.documentId)
    }

    return !!deletedFile
  }
}
