import Table from '@/components/home/Table'
import AddUser from '@/components/layout/AddUser'
import Sidebar from '@/components/layout/SideBar'

export default function Home() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Table />
      </div>
    </>
  )
}
