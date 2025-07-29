import { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

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
        to: to,
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
            <p style="font-size: 14px; color: #888;">รหัสนี้จะหมดอายุภายใน [ระบุเวลา เช่น 5 นาที] หากคุณไม่ได้เป็นผู้ร้องขอ โปรดละเว้นอีเมลนี้</p>
            <p style="font-size: 16px; color: #555;">ขอแสดงความนับถือ,<br/>ทีมงาน Flon App</p>
            <hr style="border: none; border-top: 1px solid #eee; margin-top: 20px;">
            <p style="font-size: 12px; color: #aaa; text-align: center;">อีเมลนี้ถูกส่งโดยอัตโนมัติ กรุณาอย่าตอบกลับอีเมลนี้</p>
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
