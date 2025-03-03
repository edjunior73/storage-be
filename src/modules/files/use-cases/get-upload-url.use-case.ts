import { DocumentService } from '@modules/documents'
import { StorageService } from '@modules/storage'
import { UserService } from '@modules/users/user.service'
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { uuid } from 'uuidv4'

import { UploadFileDto } from '../dto'
import { File } from '../file.model'
import { FileRepository } from '../file.repository'

export interface GetUploadUrlArgs extends UploadFileDto {
  documentId?: string

  document?: {
    title: string
    description?: string
  }

  title: string

  folderId?: string
  userId: string
}

@Injectable()
export class GetUploadUrlUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly storageService: StorageService,
    @Inject(forwardRef(() => DocumentService))
    private readonly documentService: DocumentService,
    private readonly fileRepository: FileRepository,
  ) { }

  private updateAndGetUrl = async (title: string) => {
    const presignedUrl =
      await this.storageService.generatePutPresignedUrl(title)

    return presignedUrl
  };

  async execute({
    title,
    userId,
    document: documentInput,
    documentId,
    folderId,
  }: GetUploadUrlArgs): Promise<{ presignedUrl: string; createdFile: File }> {
    const uniqueId = uuid()
    const foundUser = await this.userService.getUserById({ userId })

    if (!foundUser) throw new NotFoundException('User not found')

    if (!documentInput && !documentId) {
      throw new BadRequestException('Document or documentId is required')
    }

    if (documentId) {
      const foundDocument = await this.documentService.getById(documentId)
      if (!foundDocument) {
        throw new NotFoundException('Document not found')
      }
      const presignedUrl = await this.updateAndGetUrl(`${uniqueId}_${title}`)

      const createdFile = await this.fileRepository.create({
        documentId: foundDocument.id,
        path: `${uniqueId}_${title}`,
        userId,
      })

      await this.documentService.updateById(foundDocument.id, {
        latestVersionId: createdFile.id,
      })

      return { presignedUrl, createdFile }
    }

    const foundDocument = await this.documentService.getByUnique({
      title: documentInput.title,
      userId,
    })

    if (foundDocument) {
      if (!foundDocument.folderId) {
        const presignedUrl = await this.updateAndGetUrl(`${uniqueId}_${title}`)

        const createdFile = await this.fileRepository.create({
          documentId: foundDocument.id,
          path: `${uniqueId}_${title} `,
          userId,
        })

        await this.documentService.updateById(foundDocument.id, {
          latestVersionId: createdFile.id,
        })

        return { presignedUrl, createdFile }
      }
    }

    const presignedUrl = await this.updateAndGetUrl(`${uniqueId}_${title} `)

    const createdDocument = await this.documentService.create({
      ...documentInput,
      folderId,
      userId,
      latestVersionId: '',
    })

    const createdFile = await this.fileRepository.create({
      documentId: createdDocument.id,
      path: `${uniqueId}_${title} `,
      userId,
    })

    await this.documentService.updateById(createdDocument.id, {
      latestVersionId: createdFile.id,
    })

    return { presignedUrl, createdFile }
  }
}
