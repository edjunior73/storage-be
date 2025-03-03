import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class UploadFileDto {
  @ApiPropertyOptional()
  documentId?: string

  @ApiPropertyOptional()
  document?: {
    title: string
    description?: string
  }

  @ApiProperty()
  @IsNotEmpty()
  title: string

  @ApiPropertyOptional()
  folderId?: string
}
