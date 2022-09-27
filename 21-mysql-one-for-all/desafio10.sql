SELECT musics_name 'nome'
  , COUNT(DISTINCT users_name) 'reproducoes'
FROM SpotifyClone.history h
JOIN SpotifyClone.musics m ON m.musics_id = h.musics_id
JOIN SpotifyClone.users u ON h.users_id = u.users_id
WHERE plans_id IN (1, 4)
GROUP BY 1
;