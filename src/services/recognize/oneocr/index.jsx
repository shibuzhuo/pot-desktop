import { invoke } from '@tauri-apps/api/tauri';
import detect from '../../../utils/lang_detect';
import { Language } from './info';

export async function recognize(_, lang) {
    let result = await invoke('oneocr_ocr');
    // OneOCR 自动检测语种,这里沿用 system 服务的后处理:中文/日文去除多余空格
    if (lang === Language.auto && (await detect(result)) === Language.zh_cn) {
        result = result.replaceAll(' ', '');
    } else {
        if (lang === Language.zh_cn || lang === Language.zh_tw || lang === Language.ja) {
            result = result.replaceAll(' ', '');
        }
    }
    return result.trim();
}

export * from './Config';
export * from './info';
