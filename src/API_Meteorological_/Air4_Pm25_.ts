import { Request, Response, NextFunction } from "express";
import { myDataSource } from "../Dataconnext/app-data-source";
import { AirQualityStation, PM10, PM25, Location } from "../tableconnext/meteorological_data";
import { Pm10, Pm25, Pm25_save, Pm10_save, Pm_save_10_25 } from "../Orm_All/Pm_";
import { Repository, Not, IsNull } from "typeorm";

export const AirQualityStation_save_Data_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const airpm_data = await myDataSource.getRepository(AirQualityStation)
        const airpm10_data = await myDataSource.getRepository(PM10)
        const airpm25_data = await myDataSource.getRepository(PM25)
        const {year, month, day, hours, createdAt, area, nameTH, nameEN, stationType, lat, long, location_id, pm25, pm10} = req.body
        const data = {year, month, day, hours, createdAt, area, nameTH, nameEN, stationType, lat, long, location_id}
        const data_pm25 = {pm25}
        const data_pm10 = {pm10}
        const airpm_check_date = await airpm_data.findOne({ 
            where: 
            {
                year: Number(req.body.year), 
                month: Number(req.body.month), 
                day: Number(req.body.day), 
                hours: Number(req.body.hours),
                location_id: { id: Number(req.body.location_id)}
            }
        })
        if(airpm_check_date){
            // const ppp = await airpm25_data.findOne({ where: { air_id: {id: airpm_check_date.id}}})
            const pm25_checkidair = await Pm25(airpm25_data, airpm_check_date.id)
            const pm10_checkidair = await Pm10(airpm10_data, airpm_check_date.id)
            if(!pm25_checkidair){
                const data_pm25_save = await Pm25_save(airpm25_data, airpm_check_date.id, data_pm25)
                res.json({DATA: "ข้อมูลมีอยู่แล้ว..👌ทำการบันทึกแค่:", data_pm25_save}) 
            }if(!pm10_checkidair){
                console.log(pm10_checkidair)
                console.log(pm25_checkidair)
                const data_pm25_save = await Pm10_save(airpm10_data, airpm_check_date.id, data_pm10) 
                res.json({ DATA: "ข้อมูลมีอยู่แล้ว..👌ทำการบันทึกแค่:", data_pm25_save})
            }else{
                res.status(401).json({DATA: "มีข้อมูลซ้ำแล้วในวันเดือนหรือปีนี้ 😿",airpm_check_date})
            }
        }else{
            const air_save = await airpm_data.save(data)
            const Pm_air_save = await Pm_save_10_25(airpm25_data, airpm10_data, air_save.id, data_pm25, data_pm10)
            res.json({ DATA: "ข้อมูลถูกบันทึกแล้ว...", Pm_air_save})
        }
    }catch(err){
        console.error("เกิดข้อผิดพลาด: ",err)
        next(err)
        res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑 ", err})
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

export const Show_datalocation = async ( req: Request, res: Response, next: NextFunction) => {
  try{
    const arimydatasource = await myDataSource.getRepository(AirQualityStation)
    const locatiom_showdatapm = await arimydatasource.find({where: {year: Number(req.params.year), month: Number(req.params.month), location_id: {id: Number(req.params.id)}, day: Number(req.params.day)}, relations: ['pm25_id', 'pm10_id', 'location_id']})
    res.json(locatiom_showdatapm)
  }catch(err){
    console.error("เกิดข้อผิดพลาด: ",err)
    next(err)
    res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑 ", err})
  }
}

export const AirPM_ShowMonth = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const arimydatasource = await myDataSource.getRepository(AirQualityStation)
    const location_finddatamonth = await arimydatasource.find({ where: {year: Number(req.params.year), month: Number(req.params.month), location_id: {name_location: String(req.params.name_location)}}, relations: ['pm25_id', 'pm10_id', 'location_id']})
    res.json(location_finddatamonth)
  }catch(err){
    console.error("เกิดข้อผิดพลาด: ",err)
    next(err)
    res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑 ", err})
  }
}

export const AirPM_ShowYear = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const arimydatasource = await myDataSource.getRepository(AirQualityStation)
    const location_finddatamonth = await arimydatasource.find({ where: {year: Number(req.params.year),  location_id: {name_location: String(req.params.name_location)}}, relations: ['pm25_id', 'pm10_id', 'location_id']})
    res.json(location_finddatamonth)
  }catch(err){
    console.error("เกิดข้อผิดพลาด: ",err)
    next(err)
    res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑 ", err})
  }
}


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
        latitude: loc.latitude,
        longitude: loc.longitude,
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