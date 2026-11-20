use rusqlite::{Connection, params};
use uuid::Uuid;

use crate::r#type::TrackItem;

pub fn get_or_create_album(
    conn: &Connection,
    title: &str,
    artist: &str,
    artwork_path: &str
) -> Result<Option<String>, String> {
    if title.trim().is_empty() {
        return Ok(None);
    }

    let id = Uuid::new_v4().to_string();

    conn.execute(
        "INSERT INTO albums (id, title, artist,artwork_path)
         VALUES (?1, ?2, ?3 , ?4)
         ON CONFLICT(title, artist) DO NOTHING",
        params![id, title, artist , artwork_path],
    )
    .map_err(|e| e.to_string())?;

    let album_id: String = conn
        .query_row(
            "SELECT id FROM albums
         WHERE title = ?1 AND artist = ?2",
            params![title, artist],
            |row| row.get(0),
        )
        .map_err(|e| e.to_string())?;

    Ok(Some(album_id))
}

pub fn create_database() -> Result<Connection, String> {
    let conn = Connection::open("music.db").map_err(|e| e.to_string())?;

    // Activer les clés étrangères
    conn.execute("PRAGMA foreign_keys = ON", [])
        .map_err(|e| e.to_string())?;

    // Création des tables
    conn.execute_batch(
        "
        CREATE TABLE IF NOT EXISTS albums (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            artist TEXT NOT NULL,
            release_year INTEGER,
            artwork_path TEXT,
            UNIQUE(title, artist)
        );

        CREATE TABLE IF NOT EXISTS tracks (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            artist TEXT NOT NULL,
            album_id TEXT,
            duration_secs INTEGER NOT NULL,
            file_path TEXT UNIQUE NOT NULL,

            FOREIGN KEY (album_id)
                REFERENCES albums(id)
                ON DELETE SET NULL
        );

        CREATE TABLE IF NOT EXISTS playlists (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            image_path TEXT
        );

        CREATE TABLE IF NOT EXISTS playlist_tracks (
            playlist_id TEXT NOT NULL,
            track_id TEXT NOT NULL,
            position INTEGER NOT NULL,

            PRIMARY KEY (playlist_id, track_id),

            FOREIGN KEY (playlist_id)
                REFERENCES playlists(id)
                ON DELETE CASCADE,

            FOREIGN KEY (track_id)
                REFERENCES tracks(id)
                ON DELETE CASCADE
        );
        ",
    )
    .map_err(|e| e.to_string())?;

    Ok(conn)
}


pub fn get_all_tracks(conn: &Connection) -> Result<Vec<TrackItem>, String> {
    let mut stmt = conn
        .prepare(
            "SELECT 
                t.id, 
                t.title, 
                t.artist, 
                COALESCE(a.title, 'Album inconnu') AS album,
                t.album_id,
                t.duration_secs, 
                t.file_path, 
                a.artwork_path
             FROM tracks t
             LEFT JOIN albums a ON t.album_id = a.id
             ORDER BY a.title, t.title",
        )
        .map_err(|e| e.to_string())?;

    let rows = stmt
        .query_map([], |row| {
            Ok(TrackItem {
                id: row.get(0)?,
                title: row.get(1)?,
                artist: row.get(2)?,
                album: row.get(3)?,
                album_id: row.get(4)?,
                duration_secs: row.get(5)?,
                file_path: row.get(6)?,
                artwork_path: row.get(7)?,
            })
        })
        .map_err(|e| e.to_string())?;

    let mut tracks = Vec::new();
    for track in rows {
        tracks.push(track.map_err(|e| e.to_string())?);
    }
    Ok(tracks)
}
