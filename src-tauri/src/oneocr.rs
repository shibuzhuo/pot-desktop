use dirs::cache_dir;

#[tauri::command(async)]
#[cfg(target_os = "windows")]
pub fn oneocr_ocr(app_handle: tauri::AppHandle) -> Result<String, String> {
    let mut app_cache_dir_path = cache_dir().expect("Get Cache Dir Failed");
    app_cache_dir_path.push(&app_handle.config().tauri.bundle.identifier);
    app_cache_dir_path.push("pot_screenshot_cut.png");

    let engine = match oneocr_rs::OcrEngine::new() {
        Ok(v) => v,
        Err(e) => {
            return Err(format!(
                "Failed to init OneOCR engine: {}\n\nPlease copy oneocr.dll, oneocr.onemodel and onnxruntime.dll from the Snipping Tool directory (Get-AppxPackage Microsoft.ScreenSketch) to the same directory as pot.exe",
                e
            ));
        }
    };

    let result = engine
        .run(oneocr_rs::ImageInput::FilePath(app_cache_dir_path))
        .map_err(|e| e.to_string())?;

    let text = result
        .lines
        .iter()
        .map(|l| l.text.trim().to_string())
        .collect::<Vec<String>>()
        .join("\n");
    Ok(text)
}

#[tauri::command(async)]
#[cfg(not(target_os = "windows"))]
pub fn oneocr_ocr(_app_handle: tauri::AppHandle) -> Result<String, String> {
    Err("OneOCR is only available on Windows 11".to_string())
}
