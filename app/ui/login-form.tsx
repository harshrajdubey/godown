'use client';
 
import localFont from "next/font/local";
const geistSans = localFont({
   src: "./../fonts/GeistVF.woff",
   variable: "--font-geist-sans",
   weight: "100 900",
 });
 const geistMono = localFont({
   src: "./../fonts/GeistMonoVF.woff",
   variable: "--font-geist-mono",
   weight: "100 900",
 });
 
 import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import {Button} from "@nextui-org/react";
import { useFormState } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import Image from "next/image";
 
export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useFormState(
    authenticate,
    undefined,
  );
 
  return (
    <form action={formAction} className="space-y-3" style={{display:'inline'}}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <div className="text-center" style={{margin:'auto',marginBottom:'15px'}}>
          <Image
          src="/images/warehouse.png"
          alt="{process.env.APPNAME} logo"
          width={70}
          height={70}
          priority
          style={{margin:'auto'}}
        />
          </div>
        <h1 className={`${geistSans.variable} ${geistMono.variable} antialiased mb-3 text-2xl text-black-700`} style={{ color: 'black', fontSize: '24px' }}>
          Please log in to continue.
        </h1>
        <div className="w-full" style={{ color: 'black', fontSize: '22px' }}>
          <div>
            <label
              className="mb-3 mt-5 block text-sm font-medium text-black-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-black-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-black-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-black-500 peer-focus:text-black-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-sm font-medium text-black-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-black-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-black-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={3}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-black-500 peer-focus:text-black-900" />
            </div>
          </div>
        </div>
        <div
        className="text-center"
      aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
            <p className="text-md text-red-500" > <ExclamationCircleIcon style={{display:'inline'}} className="h-5 w-5 text-red-500" />
              {errorMessage}</p>
            </>
          )}
        </div>

            <Button type="submit" color="primary" style={{background:'blue',color:'white',borderRadius:'10px',marginTop:'15px',padding:'10px'}}>
            Log In <ArrowRightIcon className="ml-auto h-5 w-5 text-black-50" style={{display:'inline'}} />
    </Button>

        
      </div>
    </form>
  );
}