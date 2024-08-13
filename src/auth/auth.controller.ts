import { Controller, Post, Body, Req, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/users/dto/user.dto';
import { JwtAuthGuard } from './jwt.guard';
import { RolesGuard } from './role.guard';
import { Roles } from './role.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async signup(@Body() userData: UserDTO, @Res() res: Response) {
        const { accessToken } = await this.authService.signup(userData);

        res.setHeader('Authorization', `Bearer ${accessToken}`);
        return res.status(HttpStatus.CREATED).json({ message: 'Signup successful' });
    }

    @Post('login')
    async login(@Body() { email, password }: { email: string, password: string }, @Res() res: Response) {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
        }
        const { accessToken } = await this.authService.login(user);
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        return res.status(HttpStatus.OK).json({ message: 'Login successful' });

    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('admin-protected')
    adminProtectedRoute() {
        return { message: 'You have access as you are an admin' };
    }
}
