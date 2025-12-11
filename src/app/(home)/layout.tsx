import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navbar";
import { AnimatedBackground } from "~/components/ui/animated-background";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
