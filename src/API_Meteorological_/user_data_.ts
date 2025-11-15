import { Request, Response, NextFunction } from "express";
import { myDataSource } from "../Dataconnext/app-data-source";
import { User, Ordinary_User } from "../tableconnext/meteorological_data";
import bcrypt from "bcrypt"
import jws from "jsonwebtoken"

const user_data = myDataSource.getRepository(User)

export const Admin_register = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const User_find = await user_data.find({ where : {email: req.body.email, username: req.body.username}})
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

export const Admin_Login_ = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user_data = myDataSource.getRepository(User);
    console.log("Login:", req.body)
        const User_find = await user_data.findOne({ where : {email: req.body.email, username: req.body.username}})
    

    if (!User_find) {
       res.status(401).json({ Error: "ไม่มีข้อมูลสมาชิก.." });
    }else{
        const secret = process.env.JWT_SECRET || "mySuperSecretKey";  
        const token: any = jws.sign({ userId: User_find.id, username: User_find.username, email: User_find.email }, secret, { expiresIn: '1d' });
        res.cookie("token", token, {
                httpOnly: true,
                secure: false, 
                sameSite: "lax", 
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.json({ success: true, user: { id: User_find.id, username: User_find.username } });
        }
  } catch (err) {
    console.error(err);
    next(err);
     res.status(500).json({ Error: "เกิดข้อผิดพลาด" });
  }
};

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

export const isTokenshow = (req: Request, res: Response, next: NextFunction) => {
    try{
        const finetoken = user_data.findOne({where: {name_token: String(req.params.token)}})
        if(!finetoken){
            res.status(404).json({ Error: "ไม่มีข้อมูลสมัครชิก"}) 
        }else{
            res.json({finetoken})
        }
    }catch(err){
        console.error(err);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
    }
}


export const Register_user = async (req: Request, res: Response) => {
  try {
    const { username, email, password, purpose, workplace, phone } = req.body;
    console.log(req.body)
    const userRepo = myDataSource.getRepository(Ordinary_User);
    const existing = await userRepo.findOne({ where: { email } });
    if (existing) {
       res.status(400).json({ message: "อีเมลนี้ถูกใช้แล้ว" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = userRepo.create({
      username,
      email,
      password: hashed,
      purpose,
      workplace,
      phone,
    });

    await userRepo.save(newUser);

     res.status(201).json({ message: "สมัครสมาชิกสำเร็จ", user: newUser });
  } catch (err) {
     res.status(500).json({ message: "เกิดข้อผิดพลาด", error: err });
  }
};

export const Check_email = async (req: Request, res: Response) => {
    try{
        const userRepo = myDataSource.getRepository(Ordinary_User);
        console.log(req.params.email)
        const existing = await userRepo.findOne({ where: { email: String(req.params.email) } });
    if (existing) {
       res.status(400).json({ message: "อีเมลนี้ถูกใช้แล้ว" });
    }
    res.json({Data: true})
    }catch(err){
        res.status(500).json({ message: "เกิดข้อผิดพลาด", error: err });
    }
}


export const Login_user = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userRepo = myDataSource.getRepository(Ordinary_User);
    const user = await userRepo.findOne({ where: { email: String(email) } });

    if (!user) {
       res.status(400).json({ message: "ไม่พบผู้ใช้" });
    }else{
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(400).json({ message: "รหัสผ่านไม่ถูกต้อง" });
        }

        const token = jws.sign(
        { id: user.id, email: user.email, username: user.username },
        process.env.JWT_SECRET || "secret123",
        { expiresIn: "1h" }
        );

        res.json({ message: "เข้าสู่ระบบสำเร็จ", token, user });
        }
  } catch (err) {
     res.status(500).json({ message: "เกิดข้อผิดพลาด", error: err });
  }
};


export const decodeToken = async(req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization; 
    if (!authHeader) {
       res.status(401).json({ message: "ไม่มี token" });
    }else{
        
        const token = authHeader.split(" ")[1]; 
        const decoded = jws.decode(token);
        if (!decoded) {
        res.status(400).json({ message: "ไม่สามารถถอดรหัส token ได้" });
        }else{
            console.log(decoded)
        res.json({
        message: "ถอดรหัสสำเร็จ",
        payload: decoded,
        });
        }
        }
  } catch (err) {
    res.status(500).json({ message: "เกิดข้อผิดพลาด", error: err });
  }
};