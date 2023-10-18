"use client"
import Navbar from '@/components/Navbar'
import Grid from '@/components/Grid'
import { useStateContext } from '@/context.js';

export default function Home() {
  const value=useStateContext();
  console.log(value);
  return (
    <main className="min-h-screen p-4">
    <Navbar/>
    <div>
    <Grid/>
    </div>
    </main>
  )
}
