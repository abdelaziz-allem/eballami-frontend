import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 to-violet-700 flex flex-col items-center justify-center text-white">
      <h1 className="text-6xl font-bold mb-4">The booking app</h1>

      <Link href="/auth/login">
        <Button
          size="lg"
          className="bg-white text-violet-700 hover:bg-violet-100 transition-colors duration-300"
        >
          Login
        </Button>
      </Link>

      <div className="text-center mt-8">© 2025 Hoyo. All rights reserved. </div>
    </div>
  );
}
