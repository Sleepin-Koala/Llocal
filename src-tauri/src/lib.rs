use std::path::{Path, PathBuf};

use rusqlite::{Connection , params};
use walkdir::WalkDir;
pub mod r#type;
use crate::{database::{create_database, get_all_tracks, get_or_create_album}, r#type::{TrackItem, TrackMetadata}};
use lofty::{
    file::{AudioFile, TaggedFileExt},
    probe::Probe,
    tag::Accessor,
};

use uuid::Uuid;
pub mod r#database;
use tauri::{AppHandle, Manager};


fn get_app_data(app : &AppHandle) -> Result<PathBuf , String>{
    let path = app.path().app_data_dir().map_err(|e| e.to_string())?;
    Ok(path)
}


#[tauri::command]
fn scan_folder(path: &str , app : AppHandle) -> Result<Vec<TrackItem>, String> {
    let extensions = ["mp3", "flac", "wav", "ogg", "m4a"];
    let conn = create_database()?;


    for entry in WalkDir::new(path) {
        let entry = entry.map_err(|op| op.to_string());
        let entry_ = entry?;
        let file_path: &std::path::Path = entry_.path();

        if file_path.is_file() {
            if let Some(ext) = file_path.extension().and_then(|s| s.to_str()) {
                if extensions.contains(&ext.to_lowercase().as_str()) {
                    if let Some(track) = extract_metadata(file_path , &app)? {
                        let id = Uuid::new_v4();
                        let album_id = get_or_create_album(&conn, &track.album, &track.artist , &track.artwork_path)?;

                        

                        conn.execute(
                            "INSERT OR IGNORE INTO tracks (id , title, artist, album_id, duration_secs, file_path)
                             VALUES (?1, ?2, ?3, ?4, ?5 , ?6 )",
                            params![
                                id.to_string(),
                                track.title,
                                track.artist,
                                album_id,
                                track.duration_secs as i64,
                                track.file_path
                            ],
                        ).map_err(|op| op.to_string())?;

                    }
                }
            }
        }
    }
    get_all_tracks(&conn)
}

fn extract_metadata(path: &std::path::Path , app : &AppHandle) -> Result<Option<TrackMetadata>, String> {
    let tagged_file: Probe<std::io::BufReader<std::fs::File>> =
        Probe::open(path).map_err(|op| op.to_string())?;

    if let Some(prop) = tagged_file.read().ok() {
        let p = prop.properties();
        let tag = prop.primary_tag().or_else(|| prop.first_tag());

        let title = tag
            .and_then(|t| t.title().map(|s| s.to_string()))
            .unwrap_or_else(|| "Titre inconnu".to_string());

        let artist: String = tag
            .and_then(|t| t.artist().map(|s| s.to_string()))
            .unwrap_or_else(|| "Artiste inconnu".to_string());

        let album = tag
            .and_then(|t| t.album().map(|s| s.to_string()))
            .unwrap_or_else(|| "Album inconnu".to_string());

        let mut artwork_path = String::new();



        if let Some(pic) = tag.and_then(|t| t.pictures().first()) {
            let data: &[u8] = pic.data();

            let file_path = get_app_data(app)?.join(format!("{}.jpg", Uuid::new_v4()));

            if let Some(parent) = file_path.parent() {
                std::fs::create_dir_all(parent).map_err(|e| e.to_string())?;
            }

            std::fs::write(&file_path, data).map_err(|e| e.to_string())?;

            artwork_path = file_path.to_string_lossy().to_string();
        }




        Ok(Some(TrackMetadata{
        title,
        artist,
        album,
        duration_secs: p.duration().as_secs(),
        file_path: path.to_string_lossy().to_string(),
        artwork_path: artwork_path.to_string()}))
    } else {
        // 4. Obligatoire : que renvoyer si tagged_file.read().ok() vaut None ?
        Ok(None)
    }
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![scan_folder])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
