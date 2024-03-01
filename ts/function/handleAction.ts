/**
 * Squareがクリックされたときに呼ばれ、現在のモードに従って処理を行う
 */
function handleClickSquare(x: number, y: number): void {
    switch (gameState.mode) {
        case 'neutral':
            console.log(FIELD_SIZE * y + x);
            break;
        case 'addHuman':
            // 指定の場所に人を追加する
            const newHuman = new Human();
            newHuman.homePos = { x, y };
            newHuman.pos = { x, y };
            addHuman(newHuman);
            // 盤面を更新する
            drawField();
            // ヒト追加モードを抜ける
            exitAddHumanMode();
            break;
        case 'selectHuman':
            const humans = getHumansFromPos({ x, y });
            // 指定の場所に人がいなければ何もしない
            if (humans.length == 0) {
                return;
            }
            // 指定の場所の人の選択状態を反転させる
            // （複数人の場合はリストの先頭）
            humans[0].isSelected = !humans[0].isSelected;
            // 盤面を更新する
            drawField();
            // 選択モードを抜ける
            exitSelectHumanMode();
            break;
    }
}

/**
 * gameStateに人と家を追加
 */
function addHuman(newHuman: Human) {
    const { x, y } = newHuman.pos;
    // 人を追加
    gameState.humans.push(newHuman);
    // 家を追加
    gameState.assets.push(
        new House({ x, y }, newHuman)
    );
}