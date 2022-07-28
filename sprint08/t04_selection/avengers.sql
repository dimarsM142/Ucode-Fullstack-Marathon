USE ucode_web;

SELECT heroes.id, heroes.name, SUM(powers.points) AS points
FROM heroes
       JOIN powers ON powers.hero_id = heroes.id
GROUP BY heroes.id
ORDER BY points DESC
LIMIT 1;

SELECT heroes.id, heroes.name, powers.points FROM heroes
       JOIN powers on powers.hero_id = heroes.id
WHERE powers.points = (SELECT min(powers.points) FROM powers)
LIMIT 1;

SELECT heroes.id, heroes.name, SUM(powers.points) as power FROM heroes, powers,
              (SELECT hero_id, COUNT(hero_id) as count_of_teams  FROM teams  GROUP BY hero_id) AS hero_teams
    WHERE heroes.id = hero_teams.hero_id
        AND heroes.id=powers.hero_id
        AND count_of_teams < 2 GROUP BY heroes.id ORDER BY power DESC;

SELECT teams.name,
       SUM(powers.points) as power FROM powers
           JOIN heroes ON powers.hero_id=heroes.id
           JOIN teams GROUP BY teams.name
    ORDER BY power ;

