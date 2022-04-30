import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';

class UserService {
    private user = UserModel;

    /**
     * Register user
     */
    public async register(
        name: string,
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.create({ name, email, password });
            const accessToken = await token.createToken(user);
            return accessToken;
        } catch (error) {
            console.log(error)
            throw new Error('Unable to create user');
        }
    }

    /**
     * Login User
     */
    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email: email });
            //cheack if the password match
            if (!user || !(await user.isValidPassword(password))) {
                throw new Error('email or password not correct');
            }
            return await token.createToken(user);
        } catch (error:any) {
            throw new Error(error);
        }
    }
}

export default UserService;
