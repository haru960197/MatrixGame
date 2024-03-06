import { InterfaceMode } from "./function/handleMode";
import { Job, Human } from "./class/Human/Human";
import { Asset } from "./class/Asset/Asset";

/* 盤面のサイズ */
export const FIELD_SIZE = 8;

export let gameState: GameState = {
    time: { d: 1, h: 14, m: 30 },
    mode: "neutral",
    addHumanType: "farmer",
    humans: [],
    assets: [],
}

// ================= type ================

export type GameState = {
    time: Time;
    mode: InterfaceMode;
    addHumanType: Job;
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