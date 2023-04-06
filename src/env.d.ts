declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECERT: string;
      SESSION_SECRET: string;
      CLOUDINARY_SECERT: string;
    }
  }
}

export {}
