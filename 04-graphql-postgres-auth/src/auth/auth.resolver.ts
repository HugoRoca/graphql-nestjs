import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  signIn(@Args('signupInput') signupInput: SignupInput): Promise<AuthResponse> {
    return this.authService.signIn(signupInput);
  }

  /*
  @Mutation()
  login(): Promise<> {
    return this.authService.login();
  }

  @Query()
  revalidateToken(): Promise<> {
    return this.authService.revalidateToken();
  }
  */
}
