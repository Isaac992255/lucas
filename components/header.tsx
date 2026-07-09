import Link from "next/link";
import { LucasLogo } from "./lucas-logo";
import { MobileMenu } from "./mobile-menu";

const navItems = [
  { label: "El sistema", href: "#mentalidad" },
  { label: "Programas", href: "#programas" },
  { label: "Mi historia", href: "#historia" },
  { label: "Contacto", href: "#contacto" },
];

export const Header = () => {
  return (
    <div className="fixed z-50 pt-6 md:pt-10 top-0 left-0 w-full">
      <header className="flex items-center justify-between container backdrop-blur-md bg-background-dark/80 py-3 px-4 md:px-6 -mx-0">
        <Link href="/" className="text-foreground-on-dark hover:text-primary transition-colors duration-300">
          <LucasLogo className="w-[140px] md:w-[180px]" />
        </Link>
        <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-12">
          {navItems.map((item) => (
            <Link
              className="uppercase inline-block text-xs tracking-[0.15em] text-foreground-muted-dark hover:text-foreground-on-dark duration-300 transition-colors ease-out font-medium"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          className="uppercase max-lg:hidden transition-colors ease-out duration-300 text-xs tracking-[0.15em] text-primary hover:text-primary-hover font-medium"
          href="/#asesoria"
        >
          Aplicar a asesoría
        </Link>
        <MobileMenu />
      </header>
    </div>
  );
};
