import Link from 'next/link'
import { MdExitToApp, MdHome, MdAdd } from 'react-icons/md'

export default function Sidebar() {
  return (
    <>
      <div className="w-16 h-[1024px] relative">
        <div className="w-16 h-[1024px] left-0 top-0 absolute bg-indigo-600"></div>
        <div className="w-9 h-9 left-[14px] top-[60px] absolute flex-col justify-center items-center inline-flex">
          <Link href="/home">
            <MdHome size={24} color="white" className="w-5 h-5" />
          </Link>
        </div>
        <div className="w-9 h-9 left-[14px] top-[120px] absolute flex-col justify-center items-center inline-flex">
          <Link href="/home/add">
            <MdAdd size={24} color="white" className="w-5 h-5" />
          </Link>
        </div>
        <div className="w-9 h-9 left-[15px] top-[180px] absolute flex-col justify-center items-center inline-flex mb-16">
          <Link href="/">
            <MdExitToApp size={24} color="white" className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </>
  )
}
