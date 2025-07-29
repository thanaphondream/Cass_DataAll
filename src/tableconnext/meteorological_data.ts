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
}

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name_location!: string

    @Column({ type: 'float', nullable: true})
    latitude!: number

    @Column({ type: 'float', nullable: true})
    longitude!: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    date!: Date

    @Column()
    area!: string

    @Column()
    nameTH!: string

    @Column()
    nameEN!: string

    @OneToMany(() => MeteoroLogical,(meteorological) => meteorological.location_id)
    meteorological_id!: MeteoroLogical[]

    @OneToMany(() => Ges, (ges) => ges.location_id)
    ges_id!: Ges[]

    @OneToMany(() => AirQualityStation, (air) => air.location_id)
    air_id!: AirQualityStation[]
}

@Entity()
export class MeteoroLogical {
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

    @Column({type: 'float', nullable: true})
    temperaturde!: number

    @Column({type: 'float', nullable: true})
    humidity!: number

    @Column({ type: 'float', nullable: true})
    slp!: number

    @Column({ type: 'float', nullable: true})
    rain!: number

    @Column({ type: 'float',  nullable: true})
    windspeed10m!: number

    @Column({ type: 'float', nullable: true})
    winddirdedtion10m!: number

    @Column({ type: 'float', nullable: true})
    lowcloud!: number

    @Column({ type: 'float', nullable: true})
    highcloud!: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    date!: Date

    @ManyToOne(() => Location,(location) => location.meteorological_id)
    location_id!: Location[]
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

    @ManyToOne(() => Location, (location) => location.ges_id)
    location_id!: Location[]
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

    @Column()
    area!: string

    @Column()
    nameTH!: string

    @Column()
    nameEN!: string

    @Column()
    stationType!: string

    @Column('decimal', { precision: 10, scale: 6 })
    lat!: number;

    @Column('decimal', { precision: 10, scale: 6 })
    long!: number;

    @ManyToOne(() => Location, (location) => location.air_id)
    location_id!: Location[]

    @OneToMany(() => PM25, (pm25) => pm25.air_id)
    pm25_id!: PM25[]

    @OneToMany(() => PM10, (pm10) => pm10.air_id)
    pm10_id!: PM10[]
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

    @ManyToOne(() => AirQualityStation, (air) => air.pm25_id)
    air_id!: AirQualityStation[]
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

    @ManyToOne(() => AirQualityStation, (air) => air.pm10_id)
    air_id!: AirQualityStation[]
}