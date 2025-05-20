import supabase from "./init";

//ログインしてるアカウントの投稿だけ読み込む
export const Fetch = async () => {
    const { data, error } = await supabase
        .from("body_data")
        .select("*")
        .eq('user', user.id);
    if (error) {
        console.error('データ取得エラー:', error.message);
    } else {
        return data;
    }
}

