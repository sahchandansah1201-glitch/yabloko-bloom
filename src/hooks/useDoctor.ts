import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Doctor } from "./useDoctors";

export interface DoctorFull extends Doctor {
  slug: string | null;
}

export function useDoctor(slug: string | undefined) {
  return useQuery({
    queryKey: ["doctor", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .eq("slug", slug!)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error("Doctor not found");
      return data as DoctorFull;
    },
    enabled: !!slug,
  });
}
