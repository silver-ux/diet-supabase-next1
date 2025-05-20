import supabase from "@/supabase/init";

export const checkSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.error('セッション取得エラー:', error);
        return;
    }

    console.log('現在のセッション:', data.session);

    if (data.session) {
        console.log('✅ ログイン中のユーザー:', data.session.user);
    } else {
        console.log('❌ 未ログイン');
    }

    return data.session.user;
};