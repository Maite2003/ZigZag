import { PublicNav } from "../components/PublicNav";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicNav />
      {children}
    </>
  );
}
