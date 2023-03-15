SELECT MIN(price) 'faturamento_minimo'
  , MAX(price) 'faturamento_maximo'
  , ROUND(AVG(price), 2) 'faturamento_medio'
  , SUM(price) 'faturamento_total'
FROM SpotifyClone.plans p
JOIN SpotifyClone.users u ON u.plans_id = p.plans_id
;