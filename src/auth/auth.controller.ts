import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/users/dto/user.dto';
import { JwtAuthGuard } from './jwt.guard';
import { RolesGuard } from './role.guard';
import { Roles } from './role.decorator';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async signup(@Body() userData: UserDTO) {
        return this.authService.signup(userData);
    }

    @Post('login')
    async login(@Body() { email, password }: { email: string, password: string }) {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            return { statusCode: 401, message: 'Invalid credentials' };
        }
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('admin-protected')
    adminProtectedRoute() {
        return { message: 'You have access as you are an admin' };
    }
}
