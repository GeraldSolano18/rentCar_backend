import Role from '../models/Role'

//CREATE ROLES BY DEFAULT

export const createRoles = async ()=>{
    try {
        const count = await Role.estimatedDocumentCount();

        if (count > 0) return;

        const values = await Promise.all([
            new Role ({name:"client"}).save(),
            new Role ({name:"moderator"}).save(),
            new Role ({name:"admin"}).save(),
        ]);

        console.log("Roles Created",values)
        
    } catch (error) {
        console.error(error)
    }

}