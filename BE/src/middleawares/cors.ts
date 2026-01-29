import cors, { CorsOptions } from "cors";

// daftar origin yang diizinkan
const allowedOrigins = [
  "http://localhost:5173",
  "https://app-circle.netlify.app"
];

// tipe callback sesuai definisi cors
type CorsCallback = (err: Error | null, allow?: boolean) => void;

// opsi cors dengan typing TS
const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: CorsCallback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export const allowCors = cors(corsOptions);
