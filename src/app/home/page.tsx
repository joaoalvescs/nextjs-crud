import Table from "@/components/home/Table";
import Sidebar from "@/components/layout/SideBar";

export default function Home() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Table />
      </div>
    </>
  );
}
