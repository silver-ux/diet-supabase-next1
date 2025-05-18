import supabase from '@/supabase/init';

export const addFunc = async (walk, num) => {
    if (num === '' || walk === '') {
        alert('入力してください');
        return;
    }

    const { data: posts, error } = await supabase
        .from('posts')
        .select('created_at')
        .order('created_at', { ascending: false })
        .limit(1);

    if (error) {
        console.error('取得エラー:', error.message);
        alert('エラーが発生しました');
        return;
    }

    const lastPost = posts[0];
    if (lastPost) {
        const lastDate = new Date(lastPost.created_at);
        const today = new Date();
        const sameDay =
            lastDate.getFullYear() === today.getFullYear() &&
            lastDate.getMonth() === today.getMonth() &&
            lastDate.getDate() === today.getDate();

        if (sameDay) {
            alert('今日はすでに投稿しています');
            return false;
        }
    }

    await supabase.from("posts").insert({ number: num, walk: walk });
}