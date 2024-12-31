import Header from '@/components/header'

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
