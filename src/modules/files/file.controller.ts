import { AuthUser } from '@common/decorators'
import { AuthGuard } from '@common/guards'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { UploadFileDto } from './dto'
import { File } from './file.model'
import { FileService } from './file.service'

@ApiTags('Files')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post()
  @UseGuards(AuthGuard)
  uploadFile(
    @AuthUser('id') userId: string,
    @Body() body: UploadFileDto,
  ): Promise<{ presignedUrl: string; createdFile: File }> {
    return this.fileService.upload({
      ...body,
      userId,
    })
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getFile(
    @Param('id') fileId: string,
    @AuthUser('id') userId: string,
  ): Promise<string> {
    return this.fileService.getFileById(fileId, userId)
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  deleteFile(@Param('id') fileId: string): Promise<boolean> {
    return this.fileService.deleteById(fileId)
  }
}
