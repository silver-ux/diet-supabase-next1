import { getUser } from "@/supabase/Fetch";
import supabase from "@/supabase/init";

// export const checkSession = async () => {
//     const { data, error } = await supabase.auth.getSession();

//     if (error) {
//         console.error('セッション取得エラー:', error);
//         return;
//     }

//     console.log('現在のセッション:', data.session);

//     if (data.session) {
//         console.log('✅ ログイン中のユーザー:', data.session.user);
//     } else {
//         console.log('❌ 未ログイン');
//     }
//     return data.session.user

// };


// アカウント作成
export const makeAnAccount = async (email, password) => {

    const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
    })
    if (error) {
        console.log(error);
        alert(`エラーです${error}`);
        return;
    }
    if (error?.message === 'User already registered') {
        alert('このメールアドレスは既に登録されています')
    }
    alert(`${email}のアカウントを作りました`)
}

// 入ってるデータの初期化
export const deleteAccount = async () => {
    const {
        data: { user },
        error
    } = await supabase.auth.getUser()

    if (error) {
        console.error('ユーザー取得失敗:', error.message)
    }

    if (user) {
        const { error: profileError } = await supabase
            .from('body_data')
            .delete()
            .eq('user_id', user.id)

        if (profileError) {
            console.error('データ削除エラー:', profileError)
        }
    }

}


