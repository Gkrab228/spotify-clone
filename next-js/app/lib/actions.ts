'use server'
import { getUploadUrl } from "@/lib/minio";
import { randomUUID } from "crypto";
import { z } from "zod";
import jwt  from "jsonwebtoken"; 
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const ImageTypes = z.literal(['png','jpeg','jpg'])



export async function saveSongRecord(formData: FormData){
    const rawData = {
        name: formData.get('songName'),
        songMP3: formData.get('songMP3'),
    }
    
    console.log(typeof rawData.songMP3);
}

export async function getPresignedUrl(type:string) {
    const key = randomUUID();
    type = type.toLowerCase();
    if(!ImageTypes.validate(type)){ throw new Error("Wrong image type");}

    
    const MP3Url = await getUploadUrl(`songs/${key}.mp3`,'audio/mpeg');
    const IMGUrl = await getUploadUrl(`images/${key}.${type}`,`image/${type}`);
    
    if(!MP3Url||!IMGUrl) throw new Error("Couldnt get url");

    return {MP3Url ,IMGUrl};
}


export type AuthState = {
  message?: string | null;
};

const LoginData = z.object({
  username: z.string(),
  password: z.string(),
})

export async function LoginAuthAction(prevState:AuthState,formData:FormData){
    
  const cookiesStore = await cookies();


  const validatedFields = LoginData.safeParse({
    username: formData.get('username'),
    password: formData.get('password')
  })
  console.log(validatedFields.error);
  if(!validatedFields.success){
    return {message:"Missing fields"}
  }
  
  const {username,password} = LoginData.parse({
    username: formData.get('username'),
    password: formData.get('password')
  })

  const user = await prisma.user.findFirst({where: {username:username}})

  if(!user) {
    return {
      message: "User not found. Failed to log in"
    }
  }

  if(user.password!==password) return {
      message: "User not found. Failed to log in"
  };
  const expiresIn = Number(process.env.JWT_EXPIRES_IN!);
  const iat = Date.parse(Date())

  const token = jwt.sign({
          iat,
          sub: user.id,
          username: user.username,
      },
      process.env.JWT_SECRET as string,
      { expiresIn },
  );

  cookiesStore.set('auth-token',token,{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: expiresIn,
      path: '/'
  });

  revalidatePath("/open");
  redirect('/open');
}