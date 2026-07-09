"use client";

import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

interface MobileMenuProps {
  className?: string;
}

export const MobileMenu = ({ className }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Mentalidad", href: "#mentalidad" },
    { name: "Programas", href: "#programas" },
    { name: "Historia", href: "#historia" },
    { name: "Contacto", href: "#contacto" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Dialog.Root modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          className={cn(
            "group lg:hidden p-2 text-foreground-on-dark transition-colors",
            className
          )}
          aria-label="Open menu"
        >
          <List className="group-[[data-state=open]]:hidden" size={24} weight="regular" />
          <X className="hidden group-[[data-state=open]]:block" size={24} weight="regular" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <div
          data-overlay="true"
          className="fixed z-30 inset-0 bg-black/50 backdrop-blur-sm"
        />

        <Dialog.Content
          onInteractOutside={(e) => {
            if (
              e.target instanceof HTMLElement &&
              e.target.dataset.overlay !== "true"
            ) {
              e.preventDefault();
            }
          }}
          className="fixed top-0 left-0 w-full z-40 py-28 md:py-40 bg-background-dark/95 backdrop-blur-md"
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>

          <nav className="flex flex-col space-y-6 container mx-auto">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className="text-xl uppercase text-foreground-on-dark/60 transition-colors ease-out duration-150 hover:text-foreground-on-dark font-medium py-2"
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-6">
              <Link
                href="/#asesoria"
                onClick={handleLinkClick}
                className="inline-block text-xl uppercase text-primary transition-colors ease-out duration-150 hover:text-primary-hover font-medium py-2"
              >
                Aplicar a asesoría
              </Link>
            </div>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
