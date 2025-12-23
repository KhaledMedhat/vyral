import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/vyral-full-logo.svg" alt="Vyral" width={200} height={200} className="object-cover h-20 w-90" />
            </Link>
            <p className="text-sm text-muted-foreground">Connect and communicate seamlessly with the modern chat experience.</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Product</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="/chat" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Chat
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Company</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Legal</h4>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Vyral. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
