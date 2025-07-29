import { Request, Response, NextFunction } from "express";
import { myDataSource } from "../Dataconnext/app-data-source";
import { User } from "../tableconnext/meteorological_data";
import bcrypt from "bcrypt"
import jws from "jsonwebtoken"

const user_data = myDataSource.getRepository(User)

export const User_data_register = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const User_find = await user_data.find({ where : {email: req.body.email, username: req.body.username}})
        console.log(User_find)
        if(User_find.length > 0){
            res.status(402).json({ Error: "อีเมลหรือชื่อนี้ถูกใช้แล้ว.."})
        }else{
            bcrypt.hash(req.body.password, 10, async(err, hash) => {
                if (err) {
                console.error(err);
                return;
                }
                console.log('Hashed password:', hash)
                req.body.password = hash
                const User_create = await user_data.create(req.body)
                const User_save = await user_data.save(User_create)
                res.json({ data: "ข้อมูลถูกบันทึกแล้ว", User_create})
            })
        }
    }catch(err){
        console.error(err)
        next(err)
        res.status(501).json(err)
    }
}

export const User_Login_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const User_find = await user_data.findOne({ where : {email: req.body.email, username: req.body.username}})
        if(!User_find){
            res.status(401).json({ Error: "ไม่มีข้อมูลสมัครชิก.."})
        }else{
            const token: any = jws.sign({ userId: User_find.id, username: User_find.username, email: User_find.email }, req.body.nametoken, { expiresIn: '1d' });
            res.json({ token });
        }
    }catch(err){
        console.error(err)
        next(err)
        res.status(501).json(err)
    }
}

export const Show_User = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user_chekcEmail = await user_data.findOne({where: {email: req.params.email}})
        if(!user_chekcEmail){
            res.status(404).json({ Error: "ไม่มีข้อมูลสมัครชิก"})
        }else{
            res.json(user_chekcEmail)
        }
    }catch(err){
        console.error(err);
         res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
    }
}


// type Branded<T, B> = T & { __brand: B };
// type EmailAddress = Branded<string, 'EmailAddress'>;

// const isEmailAddress = (email: string): email is EmailAddress => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };