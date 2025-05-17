import supabase from "./init";

export const Fetch = async () => {
    const items = await supabase.from("posts").select("*");
    return items.data;
}

