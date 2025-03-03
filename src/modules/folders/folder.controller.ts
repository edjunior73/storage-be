import { AuthUser } from '@common/decorators'
import { AuthGuard } from '@common/guards'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

import { Folder } from './folder.model'
import { FolderService } from './folder.service'

@ApiTags('Folders')
@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) { }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({
    operationId: 'getUserFolders',
    summary: 'Get the authenticated user folders',
    description: 'Get the authenticated user folders',
  })
  @ApiResponse({
    status: 200,
    type: [Folder],
  })
  @ApiBearerAuth()
  getUserFolders(@AuthUser('id') userId: string) {
    return this.folderService.getUserManyFolder(userId)
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    operationId: 'createUserFolders',
    summary: 'Create the authenticated user folder',
    description: 'Create the authenticated user folder',
  })
  @ApiResponse({
    status: 200,
    type: Folder,
  })
  @ApiBearerAuth()
  createUserFolder(@AuthUser('id') userId: string, @Body() input: any) {
    return this.folderService.create({ ...input, userId })
  }

  @Delete(':folderId/:documentId')
  @UseGuards(AuthGuard)
  @ApiOperation({
    operationId: 'deleteUserFolders',
    summary: 'Delete the authenticated user document from folder',
    description: 'Delete the authenticated user document from folder',
  })
  @ApiResponse({
    status: 200,
    type: Boolean,
  })
  @ApiBearerAuth()
  deleteDocumentFromFolder(
    @AuthUser('id') userId: string,
    @Param('folderId') folderId: string,
    @Param('documentId') documentId: string,
  ) {
    return this.folderService.deleteDocumentFromFolder({
      folderId,
      documentId,
      userId,
    })
  }

  @Put(':folderId/:documentId')
  @UseGuards(AuthGuard)
  @ApiOperation({
    operationId: 'putUserDocumentFolders',
    summary: 'Put the authenticated user document in a folder',
    description: 'Put the authenticated user document in a folder',
  })
  @ApiResponse({
    status: 200,
    type: Folder,
  })
  @ApiBearerAuth()
  updateUserDocumentFolder(
    @AuthUser('id') userId: string,
    @Param('folderId') folderId: string,
    @Param('documentId') documentId: string,
  ) {
    return this.folderService.updateUserDocumentFolder({
      folderId,
      documentId,
      userId,
    })
  }
}
