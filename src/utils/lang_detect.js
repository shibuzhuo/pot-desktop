import { invoke } from '@tauri-apps/api';

// 本地检测引擎(lingua, 离线),在线检测引擎已移除
async function local_detect(text) {
    return await invoke('lang_detect', { text: text });
}

export default async function detect(text) {
    return await local_detect(text);
}
