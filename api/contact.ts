import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {
  // Cấu hình CORS (Cross-Origin Resource Sharing)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Xử lý preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

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
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Có lỗi xảy ra khi gửi email" });
  }
}
