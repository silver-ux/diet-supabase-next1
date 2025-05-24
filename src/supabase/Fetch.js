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
        .order('created_at')
        .eq('user_id', user.id);
    if (error) {
        console.error('データ取得エラー:', error.message);
        return null;
    } else {
        return data;
    }
}

export const FetchMonth = async (setMonths, selectedValue, setLabels, setWeights, setWalkArr) => {
    // 年月を読み込み
    await yearMonthDay(setMonths);
    const user = await getUser();

    //選択した年月
    const startDate = `${selectedValue}-01`;
    const [yearStr, monthStr] = String(selectedValue).split('-');
    const year = Number(yearStr);
    const month = Number(monthStr);
    let nextYear = year;
    let nextMonth = month + 1;
    if (nextMonth > 12) {
        nextMonth = 1;
        nextYear += 1;
    }

    const endDate = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`;

    const { data, error } = await supabase
        .from('body_data')
        .select('*')
        .gte('created_at', startDate)
        .lt('created_at', endDate)
        .eq('user_id', user.id);

    const safeData = data ?? [];
    const monthDays = safeData.map(row => {
        const date = new Date(row.created_at);
        const year = String(date.getFullYear());
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    });


    const weightsNum = safeData.map((item) => {
        return item.weight
    });

    //歩数
    const walkNum = safeData.map((item) => {
        return item.walk
    })
    setLabels(monthDays);
    setWeights(weightsNum);
    setWalkArr(walkNum);
}

//全データから年月日を持ってきて年月を返している
export const yearMonthDay = async (setMonths) => {
    const items = await Fetch();
    const dates = items.map((row) => {
        const date = new Date(row.created_at);
        const year = String(date.getFullYear());
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`; // ← 年月形式に
    });

    const onlyoneMonth = [...new Set(dates)];
    setMonths(onlyoneMonth);

    return dates;
}