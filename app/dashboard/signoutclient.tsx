"use server"; 
import { signOut } from '@/auth';

export default async function signOutClient(){ 
  "use server"; 
  await signOut();
}
