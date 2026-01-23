import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string | null;
  image_url: string | null;
  is_top_specialist: boolean | null;
  created_at: string | null;
}

export function useDoctors() {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .order("is_top_specialist", { ascending: false })
        .order("name");

      if (error) throw error;
      return data as Doctor[];
    },
  });
}
