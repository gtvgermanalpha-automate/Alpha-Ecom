import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-aster-50">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden />
      <Container className="relative text-center">
        <p className="font-display text-[8rem] font-extrabold leading-none text-gradient sm:text-[12rem]">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">This page took a day off</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back
          on track.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="size-4" /> Back to home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">
              <ArrowLeft className="size-4" /> Contact support
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
