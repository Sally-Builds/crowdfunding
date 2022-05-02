import Project from './project.interface';
import projectModel from './project.model';

class ProjectService {
    private project = projectModel;

    /**
     * Create Project
     */
    public async create(
        name: string,
        expectedAmount: string
    ): Promise<Project | Error> {
        try {
            const project = await this.project.create({ name, expectedAmount });
            return project;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /**
     * Get all Projects
     */
    public async getAll(): Promise<Project[] | Error> {
        try {
            const projects = await this.project.find();
            return projects;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /**
     * Get Project
     */
    public async get(id: string): Promise<Project | Error> {
        try {
            const project = await (this as any).project
                .findById(id)
                .populate('donations');
            return project;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /**
     * Update Project
     */
    public async update(id:string, name:string, expectedAmount:number, consensusStatus: string): Promise<Project | Error> {
        try {
            const data = {} as Project
            if(name) {
                data.name = name
            }
            if(expectedAmount) {
                data.expectedAmount = expectedAmount
            }
            if(consensusStatus) {
                data.consensusStatus = consensusStatus
            }
            const project = await <any>this.project.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
            })
            return project
        } catch (error:any) {
                throw new Error(error)
        }
    }
}

export default ProjectService;
