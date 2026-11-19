import { FileStatus } from "./type";

export type Id =  string


export interface TrackSeed {
  readonly title: string;
  readonly durationSec: number;
  readonly fileStatus?: FileStatus;
  readonly lyrics?: string;
}

export interface AlbumSeed {
  readonly id: string;
  readonly title: string;
  readonly artistId: string;
  readonly artistName: string;
  readonly year: number;
  readonly addedAt: string;
  readonly artwork: Artwork;
  readonly tracks: readonly TrackSeed[];
}

export interface ArtistSeed {
  readonly id: string;
  readonly name: string;
  readonly artwork: Artwork;
}

export interface Artwork {
  /** Three colors read as field, shape and detail. */
  readonly palette: readonly [string, string, string];
  readonly motif: ArtworkMotif;
}

export type ArtworkMotif =
  | "arcs"
  | "strata"
  | "orbit"
  | "grid"
  | "wave"
  | "halo";


export interface Artist {
  readonly id: Id;
  readonly name: string;
  readonly albumCount: number;
  readonly trackCount: number;
  readonly artwork: Artwork;
}

export interface Album {
  readonly id: Id;
  readonly title: string;
  readonly artistId: Id;
  readonly artistName: string;
  readonly year: number;
  readonly trackCount: number;
  readonly artwork: Artwork;
  readonly addedAt: string;
}

export interface Playlist {
  readonly id: Id;
  readonly name: string;
  readonly description: string;
  readonly trackCount: number;
  readonly trackIds: readonly Id[];
  readonly artwork: Artwork;
  readonly updatedAt: string;
}
