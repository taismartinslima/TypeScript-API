import {
    Table,
    Model,
    Column,
    DataType,
    DefaultScope,
    Scopes,
    BeforeCreate,
    BeforeBulkCreate,
    AfterCreate,
    BeforeUpdate,
    AfterUpdate
} from 'sequelize-typescript';
import bcrypt from 'bcrypt';

@Table({
    timestamps: true,
    tableName: 'Users',
    modelName: 'User'
})
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null
    })
    declare firstName: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null
    })
    declare lastName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare password: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        defaultValue: false
    })
    declare isVerified: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        defaultValue: false
    })
    declare isSubscribed: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        defaultValue: false
    })
    declare isActive: boolean;

    @Column({
        type: DataType.ENUM('ADMIN', 'USER'),
        allowNull: true,
        defaultValue: 'USER'
    })
    declare hasPermission: string;

    @DefaultScope(() => ({ attributes: { exclude: ['password'] } }))
    @Scopes(() => ({ withPassword: { attributes: { include: ['password'] } } }))
    @BeforeCreate
    static async hashPassword(instance: User): Promise<void> {
        const salt = await bcrypt.genSalt(10);
        instance.password = await bcrypt.hash(instance.password, salt);
    }

    @BeforeBulkCreate
    static async hashPasswordBulk(instance: User[]): Promise<void> {
        for (const user of instance) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            console.log(`Password hashed for user: ${user.email}`);
        }
    }

    @BeforeUpdate
    static async hashPasswordOnUpdate(instance: User): Promise<void> {
        if (instance.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            instance.password = await bcrypt.hash(instance.password, salt);
        }
    }

    @AfterCreate
    static deletePassword(instance: User): void {
        delete instance.dataValues.password;
    }

    @AfterUpdate
    static deletePasswordOnUpdate(instance: User): void {
        delete instance.dataValues.password;
    }

    // TODO: Send a welcome email to the user
    // @AfterCreate
    // static async sendVerificationEmail(instance: User): Promise<void> {
    //     console.log(`Verification email sent to ${instance.email}`);
    // }
}
