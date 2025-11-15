import { Request, Response, NextFunction, json } from "express";
import { myDataSource } from "../Dataconnext/app-data-source";
import { Data3Hours_Weather, Station_Weather, Location_Ges, AirQualityStation, Location } from "../tableconnext/meteorological_data";

export const Save_Station_Weather = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const Data_Weather = myDataSource.getRepository(Station_Weather)
        const Data_checkData = await Data_Weather.findOne(
            {where: {  
                nameTH: String(req.body.nameTH),
                nameEN: String(req.body.nameEN),
                province: String(req.body.province),
                lat: Number(req.body.lat),
                long: Number(req.body.long),
                stationNumber: String(req.body.stationNumber)
            }
        })
        if(!Data_checkData){
            const create_weather = await Data_Weather.create(req.body)
            const save_weater = await Data_Weather.save(create_weather)

            save_weater && res.json("บันทึกเส็จเรียบร้อยแล้ว ^_^")
        }else{
            res.status(402).json({DATAERROR: "ข้อมูลซ้ำกันกรุณนาเช็คให้ดีครับ"})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({Error: "เกิดข้อผิดพลาดสถาน 500 :", err})
    }
}

export const Save_3Hours_weather_ = async (req: Request, res: Response, next: NextFunction) => {
    try {
    //    const Data_Weather = myDataSource.getRepository(Station_Weather);
        const Data_3Weather = myDataSource.getRepository(Data3Hours_Weather);

        const check_time_ = await Data_3Weather.findOne({
            where: {
                year: Number(req.body.year),
                month: Number(req.body.month),
                day: Number(req.body.day),
                hours: Number(req.body.hours),
                station_weather_id: {id: Number(req.body.station_weather_id)}
            }
        })

        if(check_time_){
            res.status(402).json({ DATA: "มีข้อมูลซ้ำกันกรุณาเช็คเวลาในขณะนั้น -_-"})
        }else {

           const newDataN = Data_3Weather.create({
            year: Number(req.body.year),
            month: Number(req.body.month),
            day: Number(req.body.day),
            hours: Number(req.body.hours),
            temperaturde: Number(req.body.temperaturde),
            humidity: Number(req.body.humidity),
            slp: Number(req.body.slp),
            stationPressure: Number(req.body.stationPressure),
            dewPoint: Number(req.body.dewPoint),
            vaporPressure: Number(req.body.vaporPressure),
            rain: Number(req.body.rain),
            rain24h: Number(req.body.rain24h),
            windspeed10m: Number(req.body.windspeed10m),
            winddirdedtion10m: Number(req.body.winddirdedtion10m),
            lowcloud: Number(req.body.lowcloud),   
            highcloud: Number(req.body.highcloud), 
            visibility: Number(req.body.visibility),
            date: req.body.date,
            station_weather_id: req.body.station_weather_id
            });
         await Data_3Weather.save(newDataN);

         res.status(201).json({ message: "บันทึกข้อมูลสำเร็จ", data: newDataN });

        }


    }catch(err){
          console.error(err);
         res.status(500).json({ error: "เกิดข้อผิดพลาดที่ server" });
    }
}


export const Location_Ges_SAVE = async (req: Request, res: Response) => {
    try{
        const Location_Ges_gepository = await myDataSource.getRepository(Location_Ges)
        const check_data_ = await Location_Ges_gepository.findOne({
            where: {
                nameTH: String(req.body.nameTH),
                nameEN: String(req.body.nameEN),
                areaTH: String(req.body.areaTH),
                areaEN: String(req.body.areaEN),
                // lat: Number(req.body.lat),
                // long: Number(req.body.long)
            }
        })
        if(!check_data_){
            const Location_Ges_create_ = await Location_Ges_gepository.create(req.body)
            const Location_Ges_save_ = await Location_Ges_gepository.save(Location_Ges_create_)
            Location_Ges_save_ && res.json("บันทึกเส็จเรียบร้อยแล้ว ^_^")

        }else{
            res.status(402).json({DATAERROR: "ข้อมูลซ้ำกันกรุณนาเช็คให้ดีครับ"})
        }
    }catch(err){
        console.error(err);
        res.status(500).json({ error: "เกิดข้อผิดพลาดที่ server" });
    }
}

export const showData_Air4Thai = async (req: Request, res: Response) => {
    try{
        const air4thai_ = await myDataSource.getRepository(AirQualityStation)
        const show_dataair4thai = await air4thai_.find()
        res.json(show_dataair4thai)
    }catch(err){
        console.error(err)
        res.status(500).json({ error: "เกิดข้อผิดพลาดที่ server" });
    }
}

export const ShowData_Weather_ = async (req: Request, res: Response) => {
    try{
        const Data_Weather = myDataSource.getRepository(Station_Weather)
        const ShowData_Weather = await Data_Weather.find()
        ShowData_Weather && res.json(ShowData_Weather)
    }catch(err){
        console.error(err)
        res.status(500).json({ error: "เกิดข้อผิดพลาดที่ server" });
    }
}


export const V = async (req: Request, res: Response) => {
    const Data_Weather = myDataSource.getRepository(Station_Weather)
    const Location_ = await myDataSource.getRepository(Location)
    // const B = await Data_Weather.find({
    //     relations: ['data3hours_weather_id', 'locations_id']
    // })
    const B = await Location_.find({
        relations: ['station_weather_id','station_weather_id.data3hours_weather_id']
    })
    res.json(B)
}


export const P = async (req: Request, res: Response) => {
    try{
        const location_ = await myDataSource.getRepository(Location)
        const V = await location_.find({
            order: {
                id: "ASC",
                air_id: { lastaqi_id: { createdAt: "DESC" }, id: 'ASC' }
            },
            relations: ['air_id', 'air_id.lastaqi_id', 'air_id.lastaqi_id.pm25_id', 'air_id.lastaqi_id.pm10_id', 'air_id.lastaqi_id.o3_id', 'air_id.lastaqi_id.co_id', 'air_id.lastaqi_id.no2_id', 'air_id.lastaqi_id.so2_id', 'air_id.lastaqi_id.api']
        })

        res.json(V)
    }catch(err){
        console.error(err)
        res.status(500).json({Data: "เกิดข้อมูลผิดพลาดสถานะ500"})
    }
}

export const Station_Length = async (req: Request, res: Response) => {
    try{
        const Station_Weather_ = await myDataSource.getRepository(Station_Weather)
        const AirQualityStation_ = await myDataSource.getRepository(AirQualityStation)
        const Location_Ges_ = await myDataSource.getRepository(Location_Ges)
        const weather_data = await Station_Weather_.find()
        const AirQualityStation_data = await AirQualityStation_.find()
        const Location_Ges_data = await Location_Ges_.find()
        res.json({ weather: weather_data.length, airlitystation: AirQualityStation_data.length, location_ges: Location_Ges_data.length });

    }catch(err){
        console.error(err)
        res.status(500).json({Data: "เกิดข้อมูลผิดพลาดสถานะ500"})
    }
}

export const Data_Whather_Now = async (req: Request, res: Response) => {
    try{
        const AirQualityStation_ = await myDataSource.getRepository(Data3Hours_Weather)
        const Whather = await AirQualityStation_.find({
            order: {
                year: "DESC",
                month: "DESC",
                day: "DESC",
                hours: "DESC",
            }, 
            relations: ['station_weather_id', 'station_weather_id.locations_id']
        })
        res.json({Whather})
    }catch(err){
        console.error(err)
        res.status(500).json({Data: "เกิดข้อมูลผิดพลาดสถานะ500"})
    }
}


export const Show_stationAll_Now = async (req: Request, res: Response) => {
    try {
        const Whather_ = await myDataSource
            .getRepository(Station_Weather)
            .createQueryBuilder("station")
            .leftJoinAndSelect(
                "station.data3hours_weather_id", 
                "weather",
                `weather.id = (
                    SELECT w.id
                    FROM data3_hours_weather w
                    WHERE w.stationWeatherIdId = station.id
                    ORDER BY w.year DESC, w.month DESC, w.day DESC, w.hours DESC
                    LIMIT 1
                )`
            );

        const Weather_dataShow = await Whather_.getMany();

        res.json(Weather_dataShow);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Data: "เกิดข้อมูลผิดพลาดสถานะ500" });
    }
};


export const Time_Air4 = async (req: Request, res: Response) => {
    try{
        const AirQualityStation_ = await myDataSource.getRepository(AirQualityStation)
        const showdata = await AirQualityStation_.find({
            where: {
                lastaqi_id: {
                    year: Number(req.params.year),
                    month: Number(req.params.month),
                    day: Number(req.params.day)
                },
                location_id: {
                    id: 3
                }
            },
            relations: [
                'lastaqi_id',
                'lastaqi_id.pm25_id',
                'lastaqi_id.pm10_id',
                'lastaqi_id.o3_id',
                'lastaqi_id.co_id',
                'lastaqi_id.no2_id',
                'lastaqi_id.so2_id',
                'lastaqi_id.api'
            ]
        })

        res.json({showdata})
    }catch(err){
        res.status(500).json({ Data: "เกิดข้อมูลผิดพลาดสถานะ500" });
    }
}