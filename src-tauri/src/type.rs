use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct Track {
    pub title: String,
    pub artist: String,
    pub album: String,
    pub duration_secs: u64,
    pub file_path: String,
}