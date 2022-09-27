SELECT users_name 'usuario'
	, COUNT(h.musics_id) 'qt_de_musicas_ouvidas'
	, ROUND(SUM(duration)/60, 2) 'total_minutos'
FROM SpotifyClone.users u
JOIN SpotifyClone.history h ON u.users_id = h.users_id
JOIN SpotifyClone.musics m ON m.musics_id = h.musics_id
GROUP BY 1
ORDER BY 1
;