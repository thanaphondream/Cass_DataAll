import { Request, Response, NextFunction } from "express";
import { myDataSource } from "../Dataconnext/app-data-source";
import { AirQualityStation, LastAQI_Ar4thai, PM10, PM25, O3, CO, No2_Air4thai, So2_Air4thai, AQI, Location } from "../tableconnext/meteorological_data";
import { Pm10, Pm25, Pm25_save, Pm10_save, Pm_save_10_25, o3_save, co_save, no2_save, so2_save, aqi_save } from "../Orm_All/Pm_";
import { Repository, Not, IsNull } from "typeorm";
import axios from "axios";

export const AirQualityStation_save_Data_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const airpm_data = await myDataSource.getRepository(AirQualityStation)
        const Lastaqi_data = await myDataSource.getRepository(LastAQI_Ar4thai)
        const airpm10_data = await myDataSource.getRepository(PM10)
        const airpm25_data = await myDataSource.getRepository(PM25)
        const O3_data = await myDataSource.getRepository(O3)
        const CO_data = await myDataSource.getRepository(CO)
        const No2_data = await myDataSource.getRepository(No2_Air4thai)
        const So2_data = await myDataSource.getRepository(So2_Air4thai)
        const api_data = await myDataSource.getRepository(AQI)
        const {year, month, day, hours, createdAt, areaTH, areaEN, nameTH, nameEN, stationType, stationNumber,lat, long, pm25, pm10, o3, co, no2, so2, aqi} = req.body
        const data_save = { areaTH, areaEN, nameTH, nameEN, stationType, lat, long}
        const data_pm25 = {pm25}
        const data_pm10 = {pm10}
        const airpm_check_date = await Lastaqi_data.findOne({ 
            where: 
            {
                year: Number(req.body.year), 
                month: Number(req.body.month), 
                day: Number(req.body.day), 
                hours: Number(req.body.hours),
                air_id: { id: Number(req.body.air_id) } 
            }
        })
          const Fn_save_aqi_air4thai = async (
            Lastaqi_data: any,          
            air_save: any,            
            airpm25_data: any,
            airpm10_data: any,
            data_pm25: any,
            data_pm10: any,
            o3: number,
            co: number,
            no2: number,
            so2: number,
            aqi: number,
            O3_data: any,
            CO_data: any,
            No2_data: any,
            So2_data: any,
            api_data: any,
            year: number,
            month: number,
            day: number,
            hours: number,
            createdAt: string
          ) => {
            try {
              const lestaqi_save = await Lastaqi_data.save({
                year,
                month,
                day,
                hours,
                createdAt,
                air_id: { id: req.body.air_id },
              });

              const Pm_air_save = await Pm_save_10_25(
                airpm25_data,
                airpm10_data,
                data_pm25,
                data_pm10,
                { o3 },
                { co },
                { no2 },
                { so2 },
                { aqi },
                O3_data,
                CO_data,
                No2_data,
                So2_data,
                api_data,
                lestaqi_save.id
              );

              return { DATA: "ข้อมูลถูกบันทึกแล้ว...", Pm_air_save };

            } catch (error) {
              console.error("เกิดข้อผิดพลาดในการบันทึก:", error);
              throw error;
            }
          };
        if(airpm_check_date){
            // const ppp = await airpm25_data.findOne({ where: { air_id: {id: airpm_check_date.id}}})
            const pm25_checkidair = await Pm25(airpm25_data, airpm_check_date.id)
            const pm10_checkidair = await Pm10(airpm10_data, airpm_check_date.id)
            const o3_ = await O3_data.findOne({where: {lastaqi_id: {air_id: {id: Number(airpm_check_date.id)}}}})
            const co_ = await CO_data.findOne({where: {lastaqi_id: {air_id: {id: Number(airpm_check_date.id)}}}})
            const no2_ = await No2_data.findOne({where: {lastaqi_id: {air_id: {id: Number(airpm_check_date.id)}}}})
            const so2_ = await So2_data.findOne({where: {lastaqi_id: {air_id: {id: Number(airpm_check_date.id)}}}})
            const api_ = await api_data.findOne({where: {lastaqi_id: {air_id: {id: Number(airpm_check_date.id)}}}})
            let data_check_ok: any = null
            if(!pm25_checkidair){
              data_check_ok =  await Pm25_save(airpm25_data, airpm_check_date.id, data_pm25)
            }else if(!pm10_checkidair){
              data_check_ok = await Pm10_save(airpm10_data, airpm_check_date.id, data_pm10) 
            }else if(!o3_){
              data_check_ok = await o3_save(O3_data, airpm_check_date.id, {o3})
            }else if(!co_){
              data_check_ok = await co_save(CO_data, airpm_check_date.id, {co})
            }else if(!no2_){
              data_check_ok = await no2_save(No2_data, airpm_check_date.id, {no2})
            }else if(!so2_){
              data_check_ok = await so2_save(So2_data, airpm_check_date.id, {so2})
            }else if(!api_){
              data_check_ok = await aqi_save(api_data, airpm_check_date.id, {aqi})
            }else{
              res.status(401).json({DATA: "มีข้อมูลซ้ำแล้วในวันเดือนหรือปีนี้ 😿",airpm_check_date})
            }

            res.json({ DATA: "ข้อมูลมีอยู่แล้ว..👌ทำการบันทึกแค่:", data_check_ok})
        }else{
           const check_datadair4thai = await airpm_data.findOne({where: {stationNumber: String(stationNumber)}})
          //  if(!check_datadair4thai){
          //    const air_save = await airpm_data.save(data_save)
          //     const result = await Fn_save_aqi_air4thai(
          //     Lastaqi_data,
          //     air_save,
          //     airpm25_data,
          //     airpm10_data,
          //     data_pm25,
          //     data_pm10,
          //     o3,
          //     co,
          //     no2,
          //     so2,
          //     aqi,
          //     O3_data,
          //     CO_data,
          //     No2_data,
          //     So2_data,
          //     api_data,
          //     year,
          //     month,
          //     day,
          //     hours,
          //     createdAt
          //   );

          //   res.json(result);
          // res.status(403).json({ ErrorData: "ไม่มีสถานีในฐานข้อมูล"})
          //  }else{

            console.log(req.body.air_id, airpm_check_date)
            const result = await Fn_save_aqi_air4thai(
              Lastaqi_data,
              check_datadair4thai,
              airpm25_data,
              airpm10_data,
              data_pm25,
              data_pm10,
              o3,
              co,
              no2,
              so2,
              aqi,
              O3_data,
              CO_data,
              No2_data,
              So2_data,
              api_data,
              year,
              month,
              day,
              hours,
              createdAt
            );

            res.json(result);
          //  }
        }

    }catch(err){
      console.error("เกิดข้อผิดพลาด: ", err)
      return res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารถเข้าถึงได้ 😑", err })
    }
}

export const Air4_Pm25_Showdata_All = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const airpm_data = await myDataSource.getRepository(AirQualityStation)
        const airpm_data_show = await airpm_data.find({ relations: ['pm10_id', 'pm25_id']})
        res.json(airpm_data_show)
    }catch(err){
        console.error("เกิดข้อผิดพลาด: ",err)
        next(err)
        res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑 ", err})
    }
}

export const Pm25_Now = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const airRepo = myDataSource.getRepository(AirQualityStation);

    const subQuery = airRepo
      .createQueryBuilder("sub_air")
      .select("MAX(sub_air.createdAt)", "maxCreatedAt")
      .addSelect("sub_air.location_id", "location_id")
      .groupBy("sub_air.location_id");

    const latestAirData = await airRepo
      .createQueryBuilder("air")
      .innerJoin(
        "(" + subQuery.getQuery() + ")",
        "latest",
        "air.location_id = latest.location_id AND air.createdAt = latest.maxCreatedAt"
      )
      .leftJoinAndSelect("air.location_id", "location")
      .leftJoinAndSelect("air.pm25_id", "pm25")
      .leftJoinAndSelect("air.pm10_id", "pm10")
      .orderBy("air.createdAt", "DESC")
      .getMany();

    res.json(latestAirData);
  } catch (err) {
    console.error("❌ Error fetching latest air data:", err);
    res.status(500).json({
      error: "เกิดข้อผิดพลาดไม่สามารถเข้าถึงข้อมูลล่าสุดของอากาศได้",
      detail: err,
    });
  }
};

export const Show_AirQualitystation = async ( req: Request, res: Response, next: NextFunction) => {
  try{
   const arimydatasource = await myDataSource.getRepository(AirQualityStation)
    const location_finddatamonth = await arimydatasource.find({
      relations: [
        'location_id',
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
    res.json(location_finddatamonth)
  }catch(err){
    console.error("เกิดข้อผิดพลาด: ",err)
    next(err)
    res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑 ", err})
  }
}

export const AirPM_NowData = async (req: Request, res: Response, next: NextFunction) => {
   try {
    const station = await myDataSource.getRepository(AirQualityStation).findOne({
      where: { id: Number(req.params.id) },
    });

    if (!station) {
      return res.status(404).json({ error: "ไม่พบสถานีที่คุณต้องการ" });
    }

      const latest = await myDataSource
      .getRepository(LastAQI_Ar4thai)
      .createQueryBuilder("lastaqi")
      .where("lastaqi.airIdId = :id", { id: req.params.id }) 
      .orderBy("lastaqi.year", "DESC")
      .addOrderBy("lastaqi.month", "DESC")
      .addOrderBy("lastaqi.day", "DESC")
      .addOrderBy("lastaqi.hours", "DESC")
      .leftJoinAndSelect("lastaqi.pm25_id", "pm25")
      .leftJoinAndSelect("lastaqi.pm10_id", "pm10")
      .leftJoinAndSelect("lastaqi.o3_id", "o3")
      .leftJoinAndSelect("lastaqi.co_id", "co")
      .leftJoinAndSelect("lastaqi.no2_id", "no2")
      .leftJoinAndSelect("lastaqi.so2_id", "so2")
      .leftJoinAndSelect("lastaqi.api", "api")
      .getOne();


    if (!latest) {
      return res.status(404).json({ error: "ไม่พบข้อมูล AQI ล่าสุด" });
    }

    res.json({
      id: station.id,
      areaTH: station.areaTH,
      areaEN: station.areaEN,
      nameTH: station.nameTH,
      nameEN: station.nameEN,
      stationType: station.stationType,
      stationNumber: station.stationNumber,
      lat: station.lat,
      long: station.long,
      latest_aqi: [latest],
    });
  } catch (err) {
    res.status(500).json({
      error: "เกิดข้อผิดพลาด ไม่สามารถเข้าถึงได้ 😑",
      detail: err,
    });
  }
}

// export const AirPM_ShowYear = async (req: Request, res: Response, next: NextFunction) => {
//   try{
//     const arimydatasource = await myDataSource.getRepository(AirQualityStation)
//     const location_finddatamonth = await arimydatasource.find({ where: {year: Number(req.params.year),  location_id: {name_location: String(req.params.name_location)}}, relations: ['pm25_id', 'pm10_id', 'location_id']})
//     res.json(location_finddatamonth)
//   }catch(err){
//     console.error("เกิดข้อผิดพลาด: ",err)
//     next(err)
//     res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑 ", err})
//   }
// }


export const AirPm_showdata_Location = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const locationRepository = myDataSource.getRepository(Location);

    const locations = await locationRepository.find({
      where: {
        air_id: {
          id: Not(IsNull())
        }
      },
      relations: ["air_id"],
    });

    if (locations.length === 0) {
       res.status(404).json({ message: "ไม่พบข้อมูล Location ที่มี air_id เชื่อมโยง PM" });
    }

     res.json({
      count: locations.length,
      data: locations.map((loc) => ({
        id: loc.id,
        location_name: loc.name_location,
        locationaname: loc.name_location,
        // air_id: loc.air_id
      })),
    });

    // return res.json({
    //   count: locations.length,
    //   data: locations.map((loc) => ({
    //     id: loc.id,
    //     locationaname: loc.locationaname,
    //     air_id: loc.air_id, // หรือ custom mapping ได้ เช่น loc.air_id.value
    //   })),
    // });
  } catch (err) {
    console.error("เกิดข้อผิดพลาด: ", err);
     res.status(500).json({ error: "เกิดข้อผิดพลาดไม่สามารถเข้าถึงได้ 😑", details: err });
  }
};

export const AirPM_Province = async (req: Request, res: Response, next: NextFunction) => {
  try{
    
    const arimydatasource = await myDataSource.getRepository(AirQualityStation)
    const location_finddatamonth = await arimydatasource.find({ where: {location_id: {name_location: String(req.params.name_location)}}, relations: ['pm25_id', 'pm10_id', 'location_id']})
    res.json(location_finddatamonth)
  }catch(err){
    console.error("เกิดข้อผิดพลาด: ",err)
    next(err)
    res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑 ", err})
  }
}

export const AirPm_Put = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const arimydatasource = await myDataSource.getRepository(AirQualityStation)
    const aircheck_id = await  arimydatasource.findOne({ where: {id: Number(req.params.id)}})
    if(!aircheck_id){
      res.status(401).json({ DATA: "ไม่มีข้อมูลหรือข้อมูลในฐานข้อมูล😿", Error: aircheck_id})
    }else{
      await arimydatasource.merge(aircheck_id, req.body)
      const air_save = await arimydatasource.save(aircheck_id)
      res.json({DATA: "แก้ไขข้อมูลเรียบร้อบแล้ว: ", air_save})
    }
  }catch(err){
    console.log("เกิดข้อผิดพลาด: ", err)
    next(err)
    res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑 ", err})
  }
}

export const AirQualityStation_Area_Save = async (req: Request, res: Response) => {
  try{
    const AirQualityStation_ = myDataSource.getRepository(AirQualityStation)
    const {nameTH, nameEN, areaTH, areaEN, stationType, stationNumber, location_id} = req.body
    const check_data_ = await AirQualityStation_.findOne({ 
      where: {
        nameTH: String(nameTH),
        nameEN: String(nameEN),
        areaTH: String(areaTH),
        areaEN: String(areaEN),
        stationNumber: String(stationNumber),
        stationType: String(stationType),
        location_id: {id: Number(location_id)}
      }
    }) 
    if(check_data_){
      res.status(402).json({DATA: "มีข้อมูลซ้ำกันในฐานข้อมูลกรูณาเช็คก่อนนะครับ☺️"})
    }else{
      const air_create_ = await AirQualityStation_.create(req.body)
      const air_save_ = await AirQualityStation_.save(air_create_)
      air_save_ && res.status(201).json("บันทึกข้อมูลเรียบร้อยแล้ว")
     }

  }catch(err){
    console.error(err)
    res.status(500).json({ Error: "เกิดข้อผิดพลาดสถานนะ: 500", err})
  }
}


export const getLatestAirQuality = async (req: Request, res: Response) => {
  try {
    const data = await myDataSource
      .getRepository(AirQualityStation)
      .createQueryBuilder("station")
      .leftJoinAndSelect(
        "station.lastaqi_id",
        "lastaqi",
        `lastaqi.id = (
            SELECT l.id
            FROM last_aqi_ar4thai l
            WHERE l.airIdId = station.id
            ORDER BY l.year DESC, l.month DESC, l.day DESC, l.hours DESC
            LIMIT 1
        )`
      )
      .leftJoinAndSelect("lastaqi.pm25_id", "pm25")
      .leftJoinAndSelect("lastaqi.pm10_id", "pm10")
      .leftJoinAndSelect("lastaqi.o3_id", "o3")
      .leftJoinAndSelect("lastaqi.co_id", "co")
      .leftJoinAndSelect("lastaqi.no2_id", "no2")
      .leftJoinAndSelect("lastaqi.so2_id", "so2")
      .leftJoinAndSelect("lastaqi.api", "aqi")
      .getMany();

    res.json(data);
  } catch (err) {
    console.error("❌ Query Error:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};
