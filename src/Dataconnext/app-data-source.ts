import { DataSource } from "typeorm"
import { MeteoroLogical,Location, Ges, User, So2, Choho, No2, AirQualityStation, PM10, PM25} from "../tableconnext/meteorological_data"

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
    type: 'postgres',
    host: 'ijgqyvvommuowgkfbtfz.supabase.co',
    port: 5432,
    username: 'dreamtest',
    password: 'Dream480201?',
    database: 'user',
    entities: [MeteoroLogical, Location, Ges, User, So2, Choho, No2, AirQualityStation, PM10, PM25],
    synchronize: true,
    ssl: {
        rejectUnauthorized: false,
    },
})