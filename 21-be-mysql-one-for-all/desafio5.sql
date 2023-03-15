SELECT musics_name 'cancao'
	, COUNT(h.musics_id) 'reproducoes'
FROM SpotifyClone.history h
JOIN SpotifyClone.musics m ON m.musics_id = h.musics_id
GROUP BY 1
ORDER BY 2 DESC, 1
LIMIT 2
;