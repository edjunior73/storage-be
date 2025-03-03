import { DocumentService } from '@modules/documents'
import { StorageService } from '@modules/storage'
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { FileRepository } from '../file.repository'

export interface GetFileUrlArgs {
  fileId: string
  userId: string
}

@Injectable()
export class GetFileUrlUseCase {
  constructor(
    private readonly storageService: StorageService,
    private readonly fileRepository: FileRepository,
  ) { }

  async execute({ fileId, userId }: GetFileUrlArgs): Promise<string> {
    const foundFile = await this.fileRepository.getById(fileId)

    if (!foundFile || foundFile.userId !== userId)
      throw new NotFoundException('File not found')

    return this.storageService.generatePresignedUrl(foundFile.path)
  }
}
