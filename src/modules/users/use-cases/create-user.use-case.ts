import { CryptService } from '@modules/global'
import { BadRequestException, Injectable } from '@nestjs/common'

import { CreateUserDto } from '../dto'
import { AuthService } from '../services'
import { UserRepository } from '../user.repository'

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptService: CryptService,
    private readonly authService: AuthService,
  ) { }

  async execute(input: CreateUserDto) {
    const foundUser = await this.userRepository.getByEmail(input.email)

    if (foundUser) throw new BadRequestException('User already exists')

    const encryptedPassword = await this.cryptService.encrypt(input.password)

    const user = await this.userRepository.createUser({
      ...input,
      password: encryptedPassword,
    })

    const response = this.authService.getUserLoginPayload(user)

    await this.userRepository.updateById(user.id, {
      refreshToken: response.refreshToken,
    })

    return response
  }
}
