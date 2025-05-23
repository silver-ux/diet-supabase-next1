import supabase from "./init";

// 現在のユーザー情報を取得
export const getUser = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.error('ユーザー取得エラー:', userError.message);
        return null;
    }

    if (!user) {
        console.error('ログインユーザーが見つかりません');
        return null;
    }
    return user;
}

//ログインしてるアカウントの投稿だけ読み込む
export const Fetch = async () => {
    const user = await getUser();

    const { data, error } = await supabase
        .from("body_data")
        .select("*")
        .eq('user_id', user.id);
    if (error) {
        console.error('データ取得エラー:', error.message);
        return null;
    } else {
        return data;
    }
}

