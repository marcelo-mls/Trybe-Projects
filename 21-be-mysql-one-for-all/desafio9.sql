SELECT COUNT(u.users_id) 'quantidade_musicas_no_historico'
FROM SpotifyClone.history h
JOIN SpotifyClone.users u ON u.users_id = h.users_id
WHERE users_name = 'Barbara Liskov'
;