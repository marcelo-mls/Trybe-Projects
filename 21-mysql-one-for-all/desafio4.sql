SELECT users_name 'usuario'
  , IF(MAX(YEAR(reproduction_date)) >= 2021, 'Usuário ativo', 'Usuário inativo') 'status_usuario'
FROM SpotifyClone.history h
JOIN SpotifyClone.users u ON u.users_id = h.users_id
GROUP BY 1
ORDER BY 1
;