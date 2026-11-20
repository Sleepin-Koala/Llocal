use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct TrackMetadata {
    pub title: String,
    pub artist: String,
    pub album: String,
    pub duration_secs: u64,
    pub file_path: String,
    pub artwork_path : String
}

#[derive(serde::Serialize)]
pub struct TrackItem {
    pub id: String,
    pub title: String,
    pub artist: String,
    pub album: String,
    pub album_id: Option<String>,
    pub duration_secs: i64,
    pub file_path: String,
    pub artwork_path: Option<String>, // Vient de la table `albums`
}
