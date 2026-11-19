use rusqlite::{Connection , params};
use walkdir::WalkDir;
pub mod r#type;
use crate::r#type::Track;
use lofty::{
    file::{AudioFile, TaggedFileExt},
    probe::Probe,
    tag::Accessor,
};

use uuid::Uuid;

#[tauri::command]
fn scan_folder(path: &str) -> Result<Vec<Track>, String> {
    let mut tracks = Vec::new();
    let extensions = ["mp3", "flac", "wav", "ogg", "m4a"];
    let conn = Connection::open("music.db").map_err(|x| x.to_string())?;
    conn.execute(
        "CREATE TABLE IF NOT EXISTS tracks (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            artist TEXT NOT NULL,
            album TEXT NOT NULL,
            duration_secs INTEGER NOT NULL,
            file_path TEXT UNIQUE NOT NULL
        )",
        [],
    ).map_err(|op| op.to_string())?;


    for entry in WalkDir::new(path) {
        let entry = entry.map_err(|op| op.to_string());
        let entry_ = entry?;
        let file_path: &std::path::Path = entry_.path();

        if file_path.is_file() {
            if let Some(ext) = file_path.extension().and_then(|s| s.to_str()) {
                if extensions.contains(&ext.to_lowercase().as_str()) {
                    if let Some(track) = extract_metadata(file_path)? {
                        let id = Uuid::new_v4();


                        conn.execute(
                            "INSERT OR IGNORE INTO tracks (id , title, artist, album, duration_secs, file_path)
                             VALUES (?1, ?2, ?3, ?4, ?5 , ?6)",
                            params![
                                id.to_string(),
                                track.title,
                                track.artist,
                                track.album,
                                track.duration_secs as i64,
                                track.file_path
                            ],
                        ).map_err(|op| op.to_string())?;
                        tracks.push(track);
                    }
                }
            }
        }
    }
    Ok(tracks)
}

fn extract_metadata(path: &std::path::Path) -> Result<Option<Track>, String> {
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

        Ok(Some(Track{
        title,
        artist,
        album,
        duration_secs: p.duration().as_secs(),
        file_path: path.to_string_lossy().to_string()}))
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
