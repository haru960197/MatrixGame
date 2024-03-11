import { gameState, FIELD_SIZE } from "../game";
import { Human, Job, addObstacleToCostMap } from "../class/Human/Human";
import { Farmer } from "../class/Human/Farmer";
import { Merchant } from "../class/Human/Merchant";
import { House } from "../class/Asset/House";
import { drawField } from "./draw";
import { exitAddHumanMode, enterAddHumanMode, exitSelectHumanMode } from "./handleMode";
import { getHumansFromPos } from "./utils";
import { Asset } from "../class/Asset/Asset";

/**
 * Squareがクリックされたときに呼ばれ、現在のモードに従って処理を行う
 */
export function handleClickSquare(x: number, y: number): void {
    switch (gameState.mode.id) {
        case 'neutral':
            console.log(FIELD_SIZE * y + x);
            break;
        case 'addHuman':
            // 指定の場所に人を追加する
            let newHuman: Human;
            if (gameState.mode.job === "farmer") {
                newHuman = new Farmer();
            } else if (gameState.mode.job === "merchant") {
                newHuman = new Merchant();
            } else {
                newHuman = new Farmer();
            }
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
    addAsset(new House({ x, y }, newHuman), true);
}

/**
 * gameStateにアセットを追加。isObstacleが真なら障害物としてcostマップに登録する
 * @param newAsset 追加するアセット
 * @param isObstacle 障害物であるか否か
 */
function addAsset(newAsset: Asset, isObstacle: boolean) {
    gameState.assets.push(newAsset);
    if (isObstacle) addObstacleToCostMap(newAsset.pos);
}

/**
 * addHumanボタンをクリックした際の処理を行う
 */
export function handleAddHumanClick(): void {
    const radioInputs = document.getElementsByName("typeForm") as NodeListOf<HTMLInputElement>;
    let job: Job | null = null;
    radioInputs.forEach((radio: HTMLInputElement) => {
        if (radio.checked) {
            job = radio.value as Job;
        }
    });

    if (!job) {
        throw new Error("job is not selected. Can't enter add-human mode.");
    }

    enterAddHumanMode(job);
}