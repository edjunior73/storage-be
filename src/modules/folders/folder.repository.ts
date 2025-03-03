import { BaseRepositoryPrisma } from '@common/classes'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { Folder } from './folder.model'

export interface CreateFolderInput
  extends Omit<Folder, 'id' | 'createdAt' | 'user' | 'documents'> {
  createdAt?: Date
}

@Injectable()
export class FolderRepository extends BaseRepositoryPrisma(Folder, 'folder') {
  async getById(id: string): Promise<Folder> {
    const data = await this.prismaService.folder.findUnique({
      where: {
        id,
      },
    })
    return this.format(data)
  }

  async getManyByUserId(
    userId: string,
    options?: Prisma.FolderFindManyArgs,
  ): Promise<Folder[]> {
    const data = await this.prismaService.folder.findMany({
      where: {
        userId,
      },
      ...options,
    })
    return this.formatMany(data)
  }

  async create(data: CreateFolderInput): Promise<Folder> {
    const folder = await this.prismaService.folder.create({
      data,
    })

    return folder
  }
}
