import Header from './_components/header'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <div className="p-6">{children}</div>
    </>
  )
}
