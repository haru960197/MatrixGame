/**
 * gameStateに従って盤面を更新する
 * 選択中の人の上には吹き出しを表示する
 */
function drawField(): void {
    // 盤面をリセットする
    resetField();

    // 人を描画
    gameState.humans.forEach((human) => {
        const { x, y } = human.pos;
        const squareEl = document.getElementById("square-" + (FIELD_SIZE * y + x));
        if (!squareEl) {
            throw new Error(`square-${FIELD_SIZE * y + x} was not found.`);
        }
        // マスの文字列を更新
        squareEl.textContent = "○";
        // 人が選択中ならマスの上に吹き出しを表示する
        if (human.isSelected) {
            const balloonEl = createBalloon(human);
            squareEl.appendChild(balloonEl);
        }
    });

    // アセットを描画
    gameState.assets.forEach((asset) => {
        const { x, y } = asset.pos;
        const squareEl = document.getElementById("square-" + (FIELD_SIZE * y + x));
        if (!squareEl) {
            throw new Error(`square-${FIELD_SIZE * y + x} was not found.`);
        }

        if (asset instanceof House) {
            // クラスをリセットする
            squareEl.classList.remove(asset.className);
            // 適切な画像表示のため、状況に応じたクラスを付与する
            // TODO：時間や状況に応じたclassNameを再検討する
            // TODO：寝ているときはnight-houseにする
            if (asset.owner.pos.x === x && asset.owner.pos.y === y) {
                // 所有者が家にいる場合
                if (isNight()) {
                    asset.className = 'evening-house';
                } else {
                    asset.className = 'normal-house';
                }

                // 画像を表示するためにマスの文字列を消す
                squareEl.textContent = "";
            } else {
                // 所有者が家にいない場合
                if (isNight()) {
                    asset.className = 'night-house';
                } else {
                    asset.className = 'normal-house';
                }
            }
            squareEl.classList.add(asset.className);
            const imgEl = document.createElement("img");
            squareEl.appendChild(imgEl);
        }
    });
}

/**
 * 盤面をリセットする（すべてのマスを空文字列にする）
 */
function resetField(): void {
    for (let i = 0; i < FIELD_SIZE; i++) {
        for (let j = 0; j < FIELD_SIZE; j++) {
            const squareEl = document.getElementById("square-" + (FIELD_SIZE * i + j));
            if (!squareEl)
                throw new Error(`square-${FIELD_SIZE * i + j} was not found.`);
            // 各マスの文字列をから文字列にリセット
            squareEl.textContent = "";
        }
    }
}

/**
 * 表示されている時刻を更新する
 */
function drawTime(): void {
    const timeEl = document.getElementById("timeLabel");
    if (!timeEl) {
        throw new Error(`timeLabel was not found.`);
    }
    timeEl.textContent = `現在の時刻 ${gameState.time.h} : ${gameState.time.m}`;
}

/**
 * 人の情報を表示する吹き出し要素を返す
 * @param human 情報を表示する対象
 * @returns 吹き出しの<div>要素
 */
function createBalloon(human: Human): HTMLDivElement {
    const divEl = document.createElement("div");
    divEl.className = "above-square";
    const balloonEl = document.createElement("div");
    balloonEl.className = "balloon2";
    const messageEl = document.createElement("p");
    messageEl.innerText =
        `名前：${human.name}
    HP：${human.hp}
    役職：${human.job}
    性格：${human.character}`;
    balloonEl.appendChild(messageEl);
    divEl.appendChild(balloonEl);

    return divEl;
}