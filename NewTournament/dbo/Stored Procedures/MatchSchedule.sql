﻿CREATE procedure dbo.MatchSchedule
@leagueid int
as

select distinct s.GameDate, m.rink,  t1.teamno as team1, t2.teamno as team2, t1.divisionid
from league l
inner join schedule s on s.Leagueid = l.id
inner join match m on m.WeekId = s.id
inner join team t1 on t1.id = m.TeamNo1 
inner join team t2 on t2.id = m.TeamNo2 
where l.id =@leagueid and m.rink <> -1 and t1.DivisionId = t2.DivisionId and s.playoffs <> 1
order by gamedate, m.rink, t1.DivisionId 