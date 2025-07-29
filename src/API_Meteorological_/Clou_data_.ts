import express,{Request, Response, NextFunction} from 'express'
import { myDataSource } from "../Dataconnext/app-data-source"
import { MeteoroLogical, Location } from "../tableconnext/meteorological_data"
import { Repository, Not, IsNull } from "typeorm";

export const Post_data_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
        console.log(req.body)
        const mydata_Clou_ = await myDataSource.getRepository(MeteoroLogical)
        const data_create = await mydata_Clou_.create(req.body)
        const data_save = await mydata_Clou_.save(data_create)

        data_save && res.send('บันทึกเรียบร้อยแล้ว ^_^')
    }catch(err){
        console.log("เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้ :(",err)
        res.status(501).json({Error: "เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้😒😒", err})
        next(err)
    }
}

export const Get_data_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const mydata_Clou_ = await myDataSource.getRepository(MeteoroLogical)
        const find_data = await mydata_Clou_.find()
        res.send(find_data)
    }catch(err){
        console.log("เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้ :(",err)
        res.status(501).json({Error: "เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้😒😒", err})
        next(err)
    }
}

export const Get_ID_data_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const mydata_Clou_ = await myDataSource.getRepository(MeteoroLogical)
        const find_id_data = await mydata_Clou_.find({ where: { id: Number(req.body.params)}})
        if(!find_id_data) {
            res.status(401).json({ Error: "เกิดข้อผิดพลาดไม่มีข้อมูลหรือไอดีไม่ถูกต้อง U_U"})
        }else{
            find_id_data && res.send(find_id_data)
        }
    }catch(err){
        console.log("เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้ :(",err)
        res.status(501).json({Error: "เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้😒😒", err})
        next(err)
    }
}

export const Put_data_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const mydata_Clou_ = await myDataSource.getRepository(MeteoroLogical)
        const find_id_data = await mydata_Clou_.findOne({ where: { id: Number(req.body.params)}})
        if(!find_id_data){
            res.status(401).json({ Error: "เกิดข้อผิดพลาดไม่มีข้อมูลหรือไอดีไม่ถูกต้อง U_U"})
        }else{
            await mydata_Clou_.merge(find_id_data, req.body)
            const save_data = await mydata_Clou_.save(find_id_data)
            find_id_data && res.send("แก้ไขเรียบร้อยแล้ว :)")
        }
        
    }catch(err){
        console.log("เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้ :(",err)
        res.status(501).json({Error: "เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้😒😒", err})
        next(err)
    }
}

export const data_Day_location_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const locationdatasource = await myDataSource.getRepository(Location)
        const locations = await locationdatasource.find({
            where:{
                meteorological_id: {year: Number(req.params.year), month: Number(req.params.month), day: Number(req.params.day)},
                id: Number(req.params.id)
            }
        })
        res.json(locations)
    }catch(err){
        console.log("เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้ :(",err)
        res.status(501).json({Error: "เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้😒😒", err})
        next(err)
    }
}

export const data_Day_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
         const locationdatasource = await myDataSource.getRepository(Location)
        const locations = await locationdatasource.find({
            where:{
                meteorological_id: {year: Number(req.params.year), 
                    month: Number(req.params.month), 
                    day: Number(req.params.day), 
                },
                name_location: String(req.params.name_location)
            },
            relations: ['meteorological_id']
        })
        res.json(locations)
    }catch(err){
        console.log("เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้ :(",err)
        res.status(501).json({Error: "เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้😒😒", err})
        next(err)
    }
}

export const data_Month_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const locationdatasource = await myDataSource.getRepository(Location)
        console.log(req.params)
        const locations = await locationdatasource.find({
            where:{
                meteorological_id: {
                    year: Number(req.params.year), 
                    month: Number(req.params.month),
                },
                name_location: String(req.params.name_location)
            },
            relations: ['meteorological_id']
        })
        res.json(locations)
    }catch(err){
        console.log("เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้ :(",err)
        res.status(501).json({Error: "เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้😒😒", err})
        next(err)
    }
}

export const data_Year_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const locationdatasource = await myDataSource.getRepository(Location)
        const locations = await locationdatasource.find({
            where:{
                meteorological_id: {year: Number(req.params.year)},
                name_location: String(req.params.name_location)
            },
            relations: ['meteorological_id']
        })
        res.json(locations)
    }catch(err){
        console.log("เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้ :(",err)
        res.status(501).json({Error: "เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้😒😒", err})
        next(err)
    }
}

export const LocationChekeTolocation_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const locationRepository = await myDataSource.getRepository(Location)
        
         const locations = await locationRepository.find({
            where: {
                meteorological_id: {
                id: Not(IsNull())
                }
            },
            relations: ["meteorological_id"],
            });

            if (locations.length === 0) {
             res.status(404).json({ message: "ไม่พบ Location ที่มี meteorological_id เชื่อมโยง" });
            }

            res.json({
            count: locations.length,
            data: locations.map(loc => ({
                id: loc.id,
                locationaname: loc.name_location,
                latitude: loc.latitude,
                longitude: loc.longitude,
                date: loc.date,
                // meteorological: loc.meteorological_id
            }))
            });
    }catch(err){
        console.log("เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้ :(",err)
        res.status(501).json({Error: "เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้😒😒", err})
        next(err)
    }
}

export const Stations_province = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const locationRepository = await myDataSource.getRepository(Location)
        const locationcheck = await locationRepository.find({
            where: {
                name_location: String(req.params.name_location)
            },
            relations: ['meteorological_id']
        })
        res.json(locationcheck)
    }catch(err){ 
        console.log("เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้ :(",err)
        res.status(501).json({Error: "เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้😒😒", err})
        next(err)
    }
}