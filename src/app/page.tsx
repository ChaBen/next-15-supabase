import { Button } from "@/components/ui/button";
import { createClient } from "@/supabase/server";
import Image from "next/image";

export default async function Home() {
  const supabase = createClient();

  const { data } = await supabase.from("wine").select("*");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {data?.map((wine) => (
        <div key={wine.id}>{wine.name}</div>
      ))}
    </div>
  );
}
