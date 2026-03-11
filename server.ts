import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, phone } = req.body;

      if (!name || !phone) {
        return res.status(400).json({ success: false, error: "Thiếu thông tin bắt buộc" });
      }

      const user = process.env.GMAIL_USER;
      const pass = process.env.GMAIL_APP_PASSWORD;

      if (!user || !pass) {
        console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables");
        return res.status(500).json({ success: false, error: "Cấu hình email chưa hoàn tất" });
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user,
          pass,
        },
      });

      const mailOptions = {
        from: `"Masteri Grand Coast Landing Page" <${user}>`,
        to: "taquang95@gmail.com",
        subject: "Đăng ký tư vấn Masteri Grand Coast",
        text: `Có một khách hàng mới đăng ký tư vấn:\n\nHọ và tên: ${name}\nSố điện thoại: ${phone}`,
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, error: "Có lỗi xảy ra khi gửi email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
