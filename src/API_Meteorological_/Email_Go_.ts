import { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { myDataSource } from "../Dataconnext/app-data-source";
import { Ordinary_User } from "../tableconnext/meteorological_data";
import bcrypt from "bcryptjs";


dotenv.config();

export const emailgo = async (req: Request, res: Response) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
     res.status(400).json({ success: false, message: "ข้อมูลไม่ครบ" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EmailUser,
        pass: process.env.EmailPass,
      },
    });

    const mailOptions = {
      from: `Flon App <${process.env.EmailUser}>`,
      to,
      subject: `OTP ของคุณสำหรับ Flon App คือ: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">รหัส OTP ของคุณ</h2>
          <p style="font-size: 16px; color: #555;">เรียน คุณลูกค้า,</p>
          <p style="font-size: 16px; color: #555;">คุณได้ร้องขอรหัสยืนยัน (OTP) เพื่อเข้าสู่ระบบหรือทำรายการใน Flon App.</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="display: inline-block; background-color: #f0f0f0; padding: 15px 30px; font-size: 28px; font-weight: bold; color: #007bff; border-radius: 5px; letter-spacing: 3px;">${text}</span>
          </div>
          <p style="font-size: 16px; color: #555;">โปรดใช้รหัส OTP นี้เพื่อยืนยันตัวตนของคุณใน Flon App.</p>
          <p style="font-size: 14px; color: #888;">รหัสนี้จะหมดอายุภายใน 5 นาที หากคุณไม่ได้เป็นผู้ร้องขอ โปรดละเว้นอีเมลนี้</p>
          <p style="font-size: 16px; color: #555;">ขอแสดงความนับถือ,<br/>ทีมงาน Flon App</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("ส่งสำเร็จ:", info.response);

     res.status(200).json({
      success: true,
      message: "ส่งอีเมลเรียบร้อยแล้ว",
    });
  } catch (err) {
    console.error("ส่งอีเมลล้มเหลว:", err);
     res.status(500).json({
      success: false,
      message: "ส่งอีเมลล้มเหลว",
      error: err,
    });
  }
};


export const Register_user = async (req: Request, res: Response) => {
  try {
    const { username, email, password, purpose, workplace, phone } = req.body;

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

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await emailgo({
      body: {
        to: email,
        subject: otp,
        text: otp,
      },
    } as Request, res);

     res.status(201).json({
      message: "สมัครสมาชิกสำเร็จ และส่งอีเมลแล้ว",
      user: newUser,
    });
  } catch (err) {
     res.status(500).json({ message: "เกิดข้อผิดพลาด", error: err });
  }
};
