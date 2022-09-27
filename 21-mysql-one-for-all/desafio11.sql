SELECT musics_name `nome_musica`
	, CASE
		WHEN musics_name LIKE '%Amar%' THEN REPLACE(musics_name, 'Amar', 'Code Review')
		WHEN musics_name LIKE '%SUPERSTAR%' THEN REPLACE(musics_name, 'SUPERSTAR', 'SUPERDEV')
		WHEN musics_name LIKE '%Bard%' THEN REPLACE(musics_name, 'Bard', 'QA')
		WHEN musics_name LIKE '%SOUL%' THEN REPLACE(musics_name, 'SOUL', 'CODE')
		WHEN musics_name LIKE '%Pais%' THEN REPLACE(musics_name, 'Pais', 'Pull Requests')
	END `novo_nome`
FROM SpotifyClone.musics
GROUP BY 1
HAVING `novo_nome` IS NOT NULL
ORDER BY 1 DESC
;