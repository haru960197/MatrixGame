import { InterfaceMode } from "./function/handleMode";
import { Human } from "./class/Human/Human";
import { Asset } from "./class/Asset/Asset";

/* 盤面のサイズ */
export const FIELD_SIZE = 8;

export let gameState: GameState = {
    time: { d: 0, h: 12, m: 0 },
    mode: { id: "neutral" },
    humans: [],
    assets: [],
}

// ================= type ================

export type GameState = {
    time: Time;
    mode: InterfaceMode;
    humans: Human[];
    assets: Asset[];
}

type Time = {
    d: number;
    h: number;
    m: number;
}

export interface HTMLEvent<T extends EventTarget> extends Event {
    target: T;
}

export type Position = {
    x: number,
    y: number,
}