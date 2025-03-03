import { Injectable } from '@nestjs/common'

import {
  CreateDocumentInput,
  DocumentRepository,
  GetDocumentByUnique,
  UpdateDocumentInput,
} from './document.repository'
import { GetManyFilesByUserIdUseCase, GetUserFilesArgs } from './use-cases'
import { DocumentWithLatestFile } from './use-cases'

@Injectable()
export class DocumentService {
  constructor(
    private readonly getManyFilesByUserIdUseCase: GetManyFilesByUserIdUseCase,
    private readonly documentRepository: DocumentRepository,
  ) { }

  getById(id: string) {
    return this.documentRepository.getById(id)
  }

  getByUnique(where: GetDocumentByUnique) {
    return this.documentRepository.getByUnique(where)
  }

  getUserDocuments(args: GetUserFilesArgs): Promise<DocumentWithLatestFile[]> {
    return this.getManyFilesByUserIdUseCase.execute(args)
  }

  create(data: CreateDocumentInput) {
    return this.documentRepository.create(data)
  }

  updateById(id: string, data: UpdateDocumentInput) {
    return this.documentRepository.updateById(id, data)
  }

  deleteById(id: string) {
    return this.documentRepository.deleteById(id)
  }
}
