import { Injectable } from '@nestjs/common'

import { FileRepository } from './file.repository'
import {
  DeleteFileUseCase,
  GetFileUrlUseCase,
  GetUploadUrlArgs,
  GetUploadUrlUseCase,
  UploadFileArgs,
} from './use-cases'

@Injectable()
export class FileService {
  constructor(
    private readonly getUploadUrlUseCase: GetUploadUrlUseCase,
    private readonly fileRepository: FileRepository,
    private readonly getFileUrlUseCase: GetFileUrlUseCase,
    private readonly deleteFileUseCase: DeleteFileUseCase,
  ) { }

  getManyByUserId(userId: string) {
    return this.fileRepository.getManyByUserId(userId)
  }

  getFileById(fileId: string, userId: string) {
    return this.getFileUrlUseCase.execute({ fileId, userId })
  }

  getManyLatestByDocumentIds(documentIds: string[]) {
    return this.fileRepository.getManyLatestByDocumentIds(documentIds)
  }

  upload(args: GetUploadUrlArgs) {
    return this.getUploadUrlUseCase.execute(args)
  }

  deleteById(fileId: string) {
    return this.deleteFileUseCase.execute({ fileId })
  }
}
