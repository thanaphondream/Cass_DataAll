import { DataSource } from "typeorm"
import { MeteoroLogical,Location, Ges, User, So2, Choho, No2, AirQualityStation, PM10, PM25} from "../tableconnext/meteorological_data"
import dotenv from 'dotenv';

dotenv.config();

// export const myDataSource = new DataSource({
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "root",
//     password: "Dream480201",
//     database: "m",
//     entities: [MeteoroLogical, Location, Ges, User, So2, Choho, No2],
//     logging: true,
//     synchronize: true,
// })


// export const myDataSource = new DataSource({
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "root",
//     password: "Dream480201",
//     database: "m",
//     entities: [MeteoroLogical, Location, Ges, User, So2, Choho, No2, AirQualityStation, PM10, PM25],
//     logging: true,
//     synchronize: true,
// })

export const myDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [MeteoroLogical, Location, Ges, User, So2, Choho, No2, AirQualityStation, PM10, PM25],
    synchronize: true,
    logging: false,

})

// export const myDataSource = new DataSource({
//     type: "mysql",
//     host: "db",
//     port: 3306,
//     username: "user",
//     password: "Dream48020?",
//     database: "mydb",
//     charset: 'utf8mb4',
//     entities: [MeteoroLogical, Location, Ges, User, So2, Choho, No2, AirQualityStation, PM10, PM25],
//     logging: true,
//     synchronize: true,
//     extra: {
//         charset: "utf8mb4_unicode_ci" 
//     }
// })