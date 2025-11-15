import { Request, Response, NextFunction, json} from "express";
import { myDataSource } from "../Dataconnext/app-data-source";
import { Location,Ges, So2, Choho, No2, Location_Ges } from "../tableconnext/meteorological_data";
import { ges_no2, ges_choho, ges_so2 } from "../Orm_All/Gas_";

export const Ges_data_post_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const ges_data = await myDataSource.getRepository(Ges)
        const ges_create = await ges_data.create(req.body)
        if(!ges_create){
            res.status(401).json({ Error: "ไม่สามารถบัทึกได้ 😑",ges_create})
        }else{
            const ges_save = await ges_data.save(ges_create)
            res.json({ Data: "บันทีกเรียบร้อยแล้วครับ❤️"})
        }
    }catch(err){
        console.error("เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑",err)
        next(err)
        res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑", err})
    }
}

export const Ges_data_get_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const ges_data = await myDataSource.getRepository(Ges)
        const ges_find = await ges_data.find()
        if(!ges_find){
            res.status(401).json({ Error: "ไม่สามารถบัทึกได้ 😑",ges_find})
        }else{
            res.json(ges_find)
        }
    }catch(err){
        console.error("เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑",err)
        next(err)
        res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑", err})
    }
}

export const So2_SaveApi = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const so2_data = await myDataSource.getRepository(So2)
        const ges_data = await myDataSource.getRepository(Ges)
        const { year, month, day, hours, location_id, so2 }: any = req.body
        const data = { year, month, day, hours, location_id}
         const ges_cheke_date = await ges_data.findOne({
            where: { 
                year: Number(req.body.year), 
                month: Number(req.body.month), 
                day: Number(req.body.day), 
                hours: Number(req.body.hours),
                locationGes_id: {id: Number(req.body.locationGes_id)}
            }
        })
        if(ges_cheke_date){
            const so2_fine1 = await so2_data.findOne({ 
                where: {
                    ges_id: {id: Number(ges_cheke_date.id)}
                }
            })
            if(so2_fine1){
                res.status(405).json({ Error: "มีข้อมูลซ้ากันของปีเดือนวันและชั่วโมงนั้น..", Howtofix: "กรุณนาเข้าไปยังapiแก้ไขเพื่อแก้ไขข้อมูล.."})
            }else{
                const data1 = { so2 }
                const so2_save = await ges_so2(data1, ges_cheke_date, so2_data)
                res.json({DATA: "ข้อมูลมีอยู่แล้ว..👌ทำการบันทึกแค่: ", so2_save})
            }
        }else{
            const ges_save = await ges_data.save(data)
            const data1 = { so2 }
            const so2_save = await ges_so2(data1, ges_save, so2_data)
            res.json({DATA: "บันทึกเรียบร้อยแล้ว..❤️",ges_save, so2_save})
        }
    }catch(err){
        console.error("เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑",err)
        next(err)
        res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑", err})

    }
}

export const Choho_SaveApi = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const choho_orm = await myDataSource.getRepository(Choho)
        const ges_data = await myDataSource.getRepository(Ges)
        const { year, month, day, hours, choho }: any = req.body
        const data = { year, month, day, hours}
        console.log(req.body)
        const ges_cheke_date = await ges_data.findOne({
            where: { 
                year: Number(req.body.year), 
                month: Number(req.body.month), 
                day: Number(req.body.day), 
                hours: Number(req.body.hours),
                locationGes_id: {id: Number(req.body.locationGes_id)}
            }
        })
        if(ges_cheke_date){
            const choho_fine1 = await choho_orm.findOne({ 
                where: {
                    ges_id: {id: Number(ges_cheke_date.id)}
                }
            })
            if(choho_fine1){
                res.status(405).json({ Error: "มีข้อมูลซ้ากันของปีเดือนวันและชั่วโมงนั้น..", Howtofix: "กรุณนาเข้าไปยังapiแก้ไขเพื่อแก้ไขข้อมูล.."})
            }else{
                const data1 = { choho }
                const choho_save = await ges_choho(data1, ges_cheke_date, choho_orm)
                res.json({ Data: "ข้อมูลมีอยู่แล้ว..👌ทำการบันทึกแค่: ", choho_save})
            }
        }else{
        const ges_save = await ges_data.save(data)
        const data1 = { choho }
        const choho_save = await ges_choho(data1, ges_save, choho_orm)
        // const choho_save = await choho_orm.save(data_choho)
        res.json({DATA: "บันทึกเรียบร้อยแล้ว..❤️",ges_save, choho_save})
        }
    }catch(err){
        console.error("เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑",err)
        next(err)
        res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑", err})
    }
}

export const No2_SaveApi = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const no2_orm = await myDataSource.getRepository(No2)
        const ges_data = await myDataSource.getRepository(Ges)
        const { year, month, day, hours, no2 }: any = req.body
        const ges_cheke_date = await ges_data.findOne({
            where: { 
                year: Number(req.body.year), 
                month: Number(req.body.month), 
                day: Number(req.body.day), 
                hours: Number(req.body.hours),
                locationGes_id: {id: Number(req.body.locationGes_id)}
            }
        })
        if(ges_cheke_date){
            const no2_fine1 = await no2_orm.findOne({
                where: {
                ges_id: { id: Number(ges_cheke_date.id) }
                }
            });
            if(no2_fine1){
                res.status(405).json({ Error: "มีข้อมูลซ้ากันของปีเดือนวันและชั่วโมงนั้น..", Howtofix: "กรุณนาเข้าไปยังapiแก้ไขเพื่อแก้ไขข้อมูล.."})
            }else{
                console.log(ges_cheke_date)
                const _no2 = { no2 }
                const data1 = await ges_no2(_no2, ges_cheke_date, no2_orm)
                res.json({ Data: "ข้อมูลมีอยู่แล้ว..👌ทำการบันทึกแค่: ",data1})
            }
        }else{
            const data = { year, month, day, hours}
            const ges_save = await ges_data.save(data)
            const _no2 = { no2 }
           const data1 = await ges_no2( _no2, ges_save, no2_orm)
            res.json({ Data: "บันทึกเรียบร้อยแล้ว..❤️", ges_save, data1})
        }
    }catch(err){
        console.error("เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑",err)
        next(err)
        res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑", err})
    }
}


export const Show_data_Ges = async (req: Request, res: Response) => {
    try{
        const locaton_ = await myDataSource.getRepository(Location)
        const location_show = await locaton_.find({
            order: {
                locationges_id: {ges_id: {year: 'DESC', month: 'DESC', day: 'DESC', hours: 'DESC'}}
            },
            relations: ['locationges_id', 'locationges_id.ges_id', 'locationges_id.ges_id.so2_id', 'locationges_id.ges_id.choho_id', 'locationges_id.ges_id.no2_id']
        })
        res.json(location_show)
    }catch(err){
        res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑", err})
    }
}

export const Location_Ges_Time = async (req: Request, res: Response) => {
    try{
        const { id, year, month, day, hours } = req.params
        const locaton_ = await myDataSource.getRepository(Location)
        const location_show = await locaton_.find({
            where: {
                id: Number(id),
               locationges_id: {
                 ges_id: {
                    year: Number(year),
                    month: Number(month),
                    day: Number(day),
                    hours: Number(hours)
                },
               }
            },
            relations: ['locationges_id', 'locationges_id.ges_id', 'locationges_id.ges_id.so2_id', 'locationges_id.ges_id.choho_id', 'locationges_id.ges_id.no2_id']
        })
        if(location_show.length === 0){
            return res.status(404).json({ Error: "ไม่พบข้อมูลตามเวลาที่ระบุ 😑"})
        }
        res.json({DATA: location_show
        })
    }catch(err){
        console.error("เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑",err)
        res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑", err})
    }
}