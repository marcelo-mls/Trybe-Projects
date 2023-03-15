SELECT artists_name 'artista'
	,  albums_name 'album'
	,  COUNT(f.users_id) 'seguidores'
FROM SpotifyClone.artists ar
JOIN SpotifyClone.albums a ON a.artists_id = ar.artists_id
JOIN SpotifyClone.following_artists f ON f.artists_id = ar.artists_id
GROUP BY 2, 1
ORDER BY 3 DESC, 1, 2
;