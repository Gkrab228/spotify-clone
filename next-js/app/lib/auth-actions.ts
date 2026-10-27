'use server'

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { revalidatePath } from "next/cache";
import { State } from "./actions";

export async function LoginAuthAction(prevState:State,FormData:FormData){
    const cookiesStore = await cookies();

    if(username!||password!) throw new Error("not found");

    const user = await prisma.user.findFirst({where: {username:username}})
    if(!user) throw new Error('not found user');

    if(user.password!==password) throw new Error('Wrond password');

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

    cookiesStore.set('authToken',token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: expiresIn,
        path: '/'
    });
    revalidatePath("/open");
    
}