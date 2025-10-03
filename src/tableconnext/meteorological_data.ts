import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne} from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    username!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @Column({default: "null"})
    name_token!: string
}

@Entity()
export class Ordinary_User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  purpose?: string; 

  @Column({ nullable: true })
  workplace?: string; 

  @Column({ nullable: true })
  phone?: string; 

  @Column({ default: true })
  isActive?: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}



@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name_location!: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    date!: Date

    @Column()
    nameTH!: string

    @Column()
    nameEN!: string

    @Column()
    number_location!: string

    @Column()
    description!: string

    @OneToMany(() => AirQualityStation, (air) => air.location_id)
    air_id!: AirQualityStation[]

    @OneToMany(() => Station_Weather,(station_weather) => station_weather.locations_id)
    station_weather_id!: Station_Weather[]

    @OneToMany(() => Location_Ges, (lc_G) => lc_G.location_id)
    locationges_id!: Location_Ges[]
}


@Entity()
export class Station_Weather{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    nameTH!: string

    @Column()
    nameEN!: string

    @Column()
    province!: string

    @Column('decimal', { precision: 10, scale: 6 })
    lat!: number;

    @Column('decimal', { precision: 10, scale: 6 })
    long!: number;

    @Column()
    stationNumber!: string

    @ManyToOne(() => Location, (location) => location.station_weather_id)
    locations_id!: Location

    @OneToMany(() => Data3Hours_Weather, (data3hors_weather) => data3hors_weather.station_weather_id)
    data3hours_weather_id!: Data3Hours_Weather[]
}

@Entity()
export class Data3Hours_Weather{
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ type: 'float', nullable: true})
    year!: number

    @Column({ type: 'float', nullable: true})
    month!: number

    @Column( { type: 'float', nullable: true})
    day!: number

    @Column({ type: 'float', nullable: true})
    hours!: number

    @Column({ type: 'float', nullable: true })
    temperaturde!: number

    @Column({ type: 'float', nullable: true })
    humidity!: number

    @Column({ type: 'float', nullable: true })
    slp!: number

    @Column({ type: 'float', nullable: true })
    stationPressure!: number

    @Column({ type: 'float', nullable: true })
    dewPoint!: number

    @Column({ type: 'float', nullable: true })
    vaporPressure!: number

    @Column({ type: 'float', nullable: true })
    rain!: number

    @Column({ type: 'float', nullable: true })
    rain24h!: number

    @Column({ type: 'float', nullable: true })
    windspeed10m!: number

    @Column({ type: 'float', nullable: true })
    winddirdedtion10m!: number

    @Column({ type: 'float', nullable: true })
    lowcloud!: number

    @Column({ type: 'float', nullable: true })
    highcloud!: number

    @Column({ type: 'float', nullable: true })
    visibility!: number

    @Column({ type: 'datetime', nullable: true })
    date!: Date;

    @ManyToOne(() => Station_Weather, (station_weather) => station_weather.data3hours_weather_id)
    station_weather_id!: Station_Weather
}


@Entity()
export class Location_Ges {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    nameTH!: string

    @Column()
    nameEN!: string

    @Column()
    areaTH!: string

    @Column()
    areaEN!: string

    @Column()
    stationNumber!: string
    
    @Column('decimal', { precision: 10, scale: 6 })
    lat!: number;

    @Column('decimal', { precision: 10, scale: 6 })
    long!: number;

    @ManyToOne(() => Location, (location) => location.locationges_id)
    location_id!: Location[]

    @OneToMany(() => Ges, (ges) => ges.locationGes_id)
    ges_id!: Ges[]
}

@Entity()
export class Ges{
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ type: 'float', nullable: true})
    year!: number

    @Column({ type: 'float', nullable: true})
    month!: number

    @Column( { type: 'float', nullable: true})
    day!: number

    @Column({ type: 'float', nullable: true})
    hours!: number

    @OneToMany(() => Choho, (choho) => choho.ges_id)
    choho_id!: Choho[]

    @OneToMany(() => So2, (so2) => so2.ges_id)
    so2_id!: So2[]

    @OneToMany(() => No2, (no2) => no2.ges_id)
    no2_id!: No2[]

    @ManyToOne(() => Location_Ges, (lc_G) => lc_G.ges_id)
    locationGes_id!: Location_Ges[]
}


@Entity()
export class So2 {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    so2_name!: string

    @Column({ type: 'float', nullable: true })
    so2!: number

    @Column({ type: 'float', nullable: true })
    aod!: number

    @Column({ type: 'float', nullable: true })
    o3!: number

    @Column({ type: 'float', nullable: true })
    flag!: number

    @ManyToOne(() => Ges, (ges) => ges.so2_id)
    ges_id!: Ges
}

@Entity()
export class Choho{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    choho_name!: string

    @Column({ type: 'float', nullable: true })
    choho!: number

    @Column({ type: 'float', nullable: true })
    aod!: number

    @Column({ type: 'float', nullable: true })
    o3!: number

    @Column({ type: 'float', nullable: true })
    flag!: number

    @ManyToOne(() => Ges, (ges) => ges.choho_id)
    ges_id!: Ges
}

@Entity()
export class No2 {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    no2_name!: string

    @Column({ type: 'float', nullable: true})
    no2!: number

    @Column({ type: 'float', nullable: true })
    aod!: number

    @Column({ type: 'float', nullable: true })
    o3!: number

    @Column({ type: 'float', nullable: true })
    flag!: number

    @Column({ type: 'float', nullable: true })
    slant!: number

    @ManyToOne(() => Ges, (ges) => ges)
    ges_id!: Ges
}

@Entity()
export class AirQualityStation{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    areaTH!: string

    @Column()
    areaEN!: string

    @Column()
    nameTH!: string

    @Column()
    nameEN!: string

    @Column()
    stationType!: string

    @Column()
    stationNumber!: string

    @Column('decimal', { precision: 10, scale: 6 })
    lat!: number;

    @Column('decimal', { precision: 10, scale: 6 })
    long!: number;

    @ManyToOne(() => Location, (location) => location.air_id)
    location_id!: Location[]

    @OneToMany(() => LastAQI_Ar4thai, (lastaqi) => lastaqi.air_id)
    lastaqi_id!: LastAQI_Ar4thai[]
}

@Entity()
export class LastAQI_Ar4thai{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'float', nullable: true})
    year!: number

    @Column({ type: 'float', nullable: true})
    month!: number

    @Column( { type: 'float', nullable: true})
    day!: number

    @Column({ type: 'float', nullable: true})
    hours!: number
    
    @CreateDateColumn()
    createdAt!: Date

    @OneToMany(() => PM25, (pm25) => pm25.lestaqi_id)
    pm25_id!: PM25[]

    @OneToMany(() => PM10, (pm10) => pm10.lastaqi_id)
    pm10_id!: PM10[]

    @OneToMany(() => O3, (o3) => o3.lastaqi_id)
    o3_id!: O3[]

    @OneToMany(() => CO, (co) => co.lastaqi_id)
    co_id!: CO[]

    @OneToMany(() => No2_Air4thai, (no2_ari4thai) => no2_ari4thai.lastaqi_id)
    no2_id!: No2_Air4thai[]

    @OneToMany(() => So2_Air4thai, (so2_air1thai) => so2_air1thai.lastaqi_id)
    so2_id!: So2_Air4thai[]

    @OneToMany(() => AQI, (api) => api.lastaqi_id)
    api!: AQI[]

    @ManyToOne(() => AirQualityStation, (air) => air.lastaqi_id)
    air_id!: AirQualityStation
}

@Entity()
export class PM25{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    color_id!: number

    @Column({ type: 'float', nullable: true})
    aqi!: number

    @Column({ type: 'float', nullable: true})
    value!: number

    @ManyToOne(() => LastAQI_Ar4thai, (lastaqi) => lastaqi.pm25_id)
    lestaqi_id!: LastAQI_Ar4thai[]
}

@Entity()
export class PM10{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    color_id!: number

    @Column({ type: 'float', nullable: true})
    aqi!: number

    @Column({ type: 'float', nullable: true})
    value!: number

    @ManyToOne(() => LastAQI_Ar4thai, (lestaqi) => lestaqi.pm10_id)
    lastaqi_id!: LastAQI_Ar4thai[]
}

@Entity()
export class O3{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    color_id!: number

    @Column({ type: 'float', nullable: true})
    aqi!: number

    @Column({ type: 'float', nullable: true})
    value!: number

    @ManyToOne(() => LastAQI_Ar4thai, (lastaqi) => lastaqi.o3_id)
    lastaqi_id!: LastAQI_Ar4thai[]
}

@Entity()
export class CO{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    color_id!: number

    @Column({ type: 'float', nullable: true})
    aqi!: number

    @Column({ type: 'float', nullable: true})
    value!: number

    @ManyToOne(() => LastAQI_Ar4thai)
    lastaqi_id!: LastAQI_Ar4thai[]
}

@Entity()
export class No2_Air4thai{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    color_id!: number

    @Column({ type: 'float', nullable: true})
    aqi!: number

    @Column({ type: 'float', nullable: true})
    value!: number

    @ManyToOne(() => LastAQI_Ar4thai, (lastaqi) => lastaqi.no2_id)
    lastaqi_id!: LastAQI_Ar4thai[]
}

@Entity()
export class So2_Air4thai{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    color_id!: number

    @Column({ type: 'float', nullable: true})
    aqi!: number

    @Column({ type: 'float', nullable: true})
    value!: number

    @ManyToOne(() => LastAQI_Ar4thai, (lastaqi) => lastaqi.so2_id)
    lastaqi_id!: LastAQI_Ar4thai[]
}

@Entity()
export class AQI{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    color_id!: number

    @Column({ type: 'float', nullable: true})
    aqi!: number

    @Column({ type: 'float', nullable: true})
    value!: number

    @ManyToOne(() => LastAQI_Ar4thai, (lastaqi) => lastaqi.api)
    lastaqi_id!: LastAQI_Ar4thai[]
}