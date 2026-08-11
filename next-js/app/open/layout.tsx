import SideBar from "@/app/ui/open/SideBar";
import Header from "@/app/ui/open/Header";
import NowPlayingBar from "@/app/ui/open/NowPlayingBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return (
    <>
      <Header />
      <SideBar />
      <main className="overflow-x-hidden rounded-md [grid-area:main] bg-neutral-900">
          {children}
      </main>
      <NowPlayingBar/>
    </>
    )
}

