import Image from 'next/image'
import store from '@/redux/store';
import { addOne, substractOne } from '@/redux/slices/counterSlice';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Home</p>
    </main>
  )
}
