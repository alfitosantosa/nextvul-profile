import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center  h-screen font-bold ml-1.5">Dashboard</div>
      <SidebarTrigger />
    </>
  );
}
// Compare this snippet from app/dashboard/product/page.tsx:
