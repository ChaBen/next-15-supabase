"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/client";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["wines"],
    queryFn: async () => {
      const { data } = await supabase.from("wine").select("*");
      return data;
    },
  });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {data?.map((wine) => (
        <div key={wine.id}>{wine.name}</div>
      ))}
    </div>
  );
}
