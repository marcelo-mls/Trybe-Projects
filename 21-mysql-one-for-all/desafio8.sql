SELECT artists_name 'artista'
  , albums_name 'album'
FROM SpotifyClone.artists ar
JOIN SpotifyClone.albums a ON a.artists_id = ar.artists_id
WHERE artists_name = 'Elis Regina'
;