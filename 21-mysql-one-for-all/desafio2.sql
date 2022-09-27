SELECT COUNT(musics_name) 'cancoes'
	, COUNT(DISTINCT artists_name) 'artistas'
	, COUNT(DISTINCT albums_name) 'albuns'
FROM SpotifyClone.musics m
JOIN SpotifyClone.albums a ON a.albums_id = m.albums_id
JOIN SpotifyClone.artists ar ON ar.artists_id = a.artists_id
;