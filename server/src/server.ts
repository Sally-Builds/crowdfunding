import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import PostController from '@/resources/post/post.controller';
import UserController from '@/resources/user/user.controller';
import ProjectController from '@/resources/project/project.controller'
import DonationController from '@/resources/donation/donation.controller'

validateEnv();

const app = new App(
    [new PostController(), new UserController(), new DonationController(), new ProjectController()],
    Number(process.env.PORT)
);

app.listen();
