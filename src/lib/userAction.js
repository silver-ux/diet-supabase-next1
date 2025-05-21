import { Fetch } from "@/supabase/Fetch";
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
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    })
    if (error) {
        console.log(error);
        alert(`エラーです${error}`)
    }
    alert(`${data.email}のアカウントを作りました`)
}



