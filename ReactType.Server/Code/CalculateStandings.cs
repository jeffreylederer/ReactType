﻿using Microsoft.EntityFrameworkCore;
using ReactType.Server.Models;


namespace ReactType.Server.Code
{

    public static class CalculateStandings
    {


        /// <summary>
        /// Determine the standings based on all the games played so far
        /// </summary>
        /// <param name="weekid">the record id of the week in the schedule table</param>
        /// <param name="teamsize">number of players per team</param>
        /// <param name="leagueid">the record id of the league table</param>
        /// <returns></returns>
        public static List<Standing> Doit(int weekid, int leagueid, DbLeagueApp db)
        {
            League? league = db.Leagues.Find(leagueid);
            int teamsize = league.TeamSize;

            var list = new List<Standing>();


            // get the names of the player for each team
            foreach (var team in db.Teams.Where(x => x.Leagueid == league.Id))
            {

                OneTeamView? team1 = db.OneTeamViews
                         .FromSql($"EXEC OneTeam {league.Id}")
                         .AsEnumerable()
                         .FirstOrDefault();
                string players = "";
                switch (teamsize)
                {
                    case 1:
                        players = team1.Skip;
                        break;
                    case 2:
                        players = $"{team1.Skip}, {team1.Lead}";
                        break;
                    case 3:
                        players = $"{team1.Skip}, {team1.ViceSkip}, {team1.Lead}";
                        break;
                }
                list.Add(new Standing()
                {
                    Team = team.TeamNo,
                    Wins = 0,
                    Loses = 0,
                    TotalScore = 0,
                    Ties = 0,
                    Byes = 0,
                    Players = players,
                    DivisionId = team.DivisionId
                });
            }

            // determine the total score and wins and loses for each team for each week
            foreach (var week in db.Schedules.Where(x => x.Id <= weekid && x.Leagueid == league.Id))
            {

                //cancelled weeks do not count
                if (week.Cancelled)
                    continue;
                //var total = 0;
                var numMatches = 0;
                var bye = false;
                bool forfeit = false;

                foreach (var match in db.Matches.Where(x => x.WeekId == week.Id))
                {

                    GetTeamView? teamView = db.GetTeamViews
                        .FromSql($"Exec GetTeam {match.Id}")
                        .AsEnumerable()
                        .FirstOrDefault();

                    // both teams forfeits
                    if (match.Rink != -1 && match.ForFeitId == -1)
                    {
                        var winner = list.Find(x => x.Team == teamView?.Team);
                        var loser = list.Find(x => x.Team == teamView?.Team1);
                        winner.Loses++;
                        loser.Loses++;

                    }
                    // tie game
                    else if (match.Team1Score == match.Team2Score && match.Rink != -1 && match.ForFeitId == 0)
                    {
                        var winner = list.Find(x => x.Team == teamView?.Team);
                        var loser = list.Find(x => x.Team == teamView?.Team1);
                        winner.Ties++;
                        loser.Ties++;
                        if (league.PointsLimit)
                        {
                            winner.TotalScore += Math.Min(20, match.Team1Score);
                            loser.TotalScore += Math.Min(20, match.Team2Score);
                            //total += Math.Min(20, match.Team1Score);
                        }
                        else
                        {
                            winner.TotalScore += match.Team1Score;
                            loser.TotalScore += match.Team2Score;
                            //total += match.Team1Score;
                        }
                        numMatches++;
                    }
                    //team 1 wins
                    else if (match.Team1Score > match.Team2Score && match.Rink != -1 && match.ForFeitId == 0)
                    {
                        var winner = list.Find(x => x.Team == teamView?.Team);
                        var loser = list.Find(x => x.Team == teamView?.Team1);
                        winner.Wins++;
                        loser.Loses++;
                        if (league.PointsLimit)
                        {
                            winner.TotalScore += Math.Min(20, match.Team1Score);
                            loser.TotalScore += Math.Min(20, match.Team2Score);
                        }
                        else
                        {
                            winner.TotalScore += match.Team1Score;
                            loser.TotalScore += match.Team2Score;
                        }
                        numMatches++;
                    }
                    //team 2 wins
                    else if (match.Rink != -1 && match.ForFeitId == 0)
                    {
                        var winner = list.Find(x => x.Team == teamView?.Team1);
                        var loser = list.Find(x => x.Team == teamView?.Team);
                        winner.Wins++;
                        loser.Loses++;
                        if (league.PointsLimit)
                        {
                            winner.TotalScore += Math.Min(20, match.Team2Score);
                            loser.TotalScore += Math.Min(20, match.Team1Score);
                        }
                        else
                        {
                            winner.TotalScore += match.Team2Score;
                            loser.TotalScore += match.Team1Score;
                        }
                        numMatches++;
                    }
                    // one team forfeits
                    else if (match.Rink != -1 && match.ForFeitId > 0)
                    {
                        var winner = list.Find(x => x.Team == (teamView?.Team == match.ForFeitId ? teamView?.Team1 : teamView?.Team));
                        var loser = list.Find(x => x.Team == match.ForFeitId);
                        forfeit = true;
                        winner.Wins++;
                        loser.Loses++;
                    }
                    //bye
                    else
                    {
                        var winner = list.Find(x => x.Team == teamView?.Team);
                        winner.Byes++;
                        bye = true;
                    }

                }

                // for byes or forfeit (the team that did not forfeit), the team gets the average score of all winning games that week and a win
                if (bye || forfeit)
                {

                    foreach (var match in db.Matches.Where(x => x.WeekId == week.Id))
                    {
                        GetTeamView? teamView = db.GetTeamViews
                       .FromSql($"Exec GetTeam {match.Id}")
                       .AsEnumerable()
                       .FirstOrDefault();

                        if (match.Rink != -1 && match.ForFeitId > 0)
                        {
                            var winner = list.Find(x => x.Team == (teamView?.Team == match.ForFeitId ? teamView?.Team1 : teamView?.Team));
                            winner.TotalScore += 14;
                        }
                        else if (match.Rink == -1 && match.ForFeitId != -1)
                        {
                            var winner = list.Find(x => x.Team == teamView?.Team);
                            winner.TotalScore += 14;
                        }
                    }
                }
            }

            int place = 1;
            int nextplace = 1;
            Standing previous = new Standing()
            {
                Loses = 0,
                TotalScore = 0,
                Wins = 0,
                Ties = 0,
                Byes = 0

            };
            foreach (var item in list)
            {
                var points = item.Wins * league.WinPoints +
                                   item.Ties * league.TiePoints + item.Byes * league.ByePoints;
                if (league.PointsCount)
                    item.TotalPoints = points * 1000 + item.TotalScore;
                else
                {
                    item.TotalPoints = points;
                    item.TotalScore = points;
                }

            }
            list.Sort((a, b) => (b.TotalPoints).CompareTo(a.TotalPoints));
            foreach (var item in list)
            {
                if (item.TotalPoints != previous.TotalPoints)
                {
                    place = nextplace;
                }
                previous = item;
                nextplace++;
            }
            return list;
        }


        /// <summary>
        /// Determine the standings based on all the games this week
        /// </summary>
        /// <param name="weekid">the record id of the week in the schedule table</param>
        /// <param name="teamsize">number of players per team</param>
        /// <param name="leagueid">the record id of the league table</param>
        /// <returns></returns>
        public static List<Standing> DoitPlayoffs(int weekid, int leagueid, DbLeagueApp db)
        {
            League? league = db.Leagues.Find(leagueid);
            int teamsize = league.TeamSize;

            var list = new List<Standing>();


            // get the names of the player for each team
            foreach (var team in db.Teams.Where(x => x.Leagueid == league.Id))
            {
                OneTeamView? team1 = db.OneTeamViews
                .FromSql($"EXEC OneTeam {league.Id}")
                .AsEnumerable()
                .FirstOrDefault();
                string players = "";
                switch (teamsize)
                {
                    case 1:
                        players = team1.Skip;
                        break;
                    case 2:
                        players = $"{team1.Skip}, {team1.Lead}";
                        break;
                    case 3:
                        players = $"{team1.Skip}, {team1.ViceSkip}, {team1.Lead}";
                        break;
                }
                list.Add(new Standing()
                {
                    Team = team.TeamNo,
                    Wins = 0,
                    Loses = 0,
                    TotalScore = 0,
                    Ties = 0,
                    Byes = 0,
                    Players = players,
                    DivisionId = team.DivisionId
                });
            }

            // determine the total score and wins and loses for each team for each week
            var week = db.Schedules.Find(weekid);
            {

                //cancelled weeks do not count

                //var total = 0;
                var numMatches = 0;
                var bye = false;
                bool forfeit = false;
                foreach (var match in db.Matches.Where(x => x.WeekId == week.Id))
                {
                    GetTeamView? teamView = db.GetTeamViews
                    .FromSql($"Exec GetTeam {match.Id}")
                    .AsEnumerable()
                    .FirstOrDefault();

                    // both teams forfeits
                    if (match.Rink != -1 && match.ForFeitId == -1)
                    {
                        var winner = list.Find(x => x.Team == teamView?.Team);
                        var loser = list.Find(x => x.Team == teamView?.Team1);
                        winner.Loses++;
                        loser.Loses++;

                    }
                    // tie game
                    else if (match.Team1Score == match.Team2Score && match.Rink != -1 && match.ForFeitId == 0)
                    {
                        var winner = list.Find(x => x.Team == teamView?.Team);
                        var loser = list.Find(x => x.Team == teamView?.Team1);
                        winner.Ties++;
                        loser.Ties++;
                        if (league.PointsLimit)
                        {
                            winner.TotalScore += Math.Min(20, match.Team1Score);
                            loser.TotalScore += Math.Min(20, match.Team2Score);
                            //total += Math.Min(20, match.Team1Score);
                        }
                        else
                        {
                            winner.TotalScore += match.Team1Score;
                            loser.TotalScore += match.Team2Score;
                            //total += match.Team1Score;
                        }
                        numMatches++;
                    }
                    //team 1 wins
                    else if (match.Team1Score > match.Team2Score && match.Rink != -1 && match.ForFeitId == 0)
                    {
                        var winner = list.Find(x => x.Team == teamView?.Team);
                        var loser = list.Find(x => x.Team == teamView?.Team1);
                        winner.Wins++;
                        loser.Loses++;
                        if (league.PointsLimit)
                        {
                            winner.TotalScore += Math.Min(20, match.Team1Score);
                            loser.TotalScore += Math.Min(20, match.Team2Score);
                        }
                        else
                        {
                            winner.TotalScore += match.Team1Score;
                            loser.TotalScore += match.Team2Score;
                        }
                        numMatches++;
                    }
                    //team 2 wins
                    else if (match.Rink != -1 && match.ForFeitId == 0)
                    {
                        var winner = list.Find(x => x.Team == teamView?.Team1);
                        var loser = list.Find(x => x.Team == teamView?.Team);
                        winner.Wins++;
                        loser.Loses++;
                        if (league.PointsLimit)
                        {
                            winner.TotalScore += Math.Min(20, match.Team2Score);
                            loser.TotalScore += Math.Min(20, match.Team1Score);
                        }
                        else
                        {
                            winner.TotalScore += match.Team2Score;
                            loser.TotalScore += match.Team1Score;
                        }
                        numMatches++;
                    }
                    // one team forfeits
                    else if (match.Rink != -1 && match.ForFeitId > 0)
                    {
                        var winner = list.Find(x => x.Team == (teamView?.Team == match.ForFeitId ? teamView?.Team1 : teamView?.Team));
                        var loser = list.Find(x => x.Team == match.ForFeitId);
                        forfeit = true;
                        winner.Wins++;
                        loser.Loses++;
                    }
                    //bye
                    else
                    {
                        var winner = list.Find(x => x.Team == teamView?.Team);
                        winner.Byes++;
                        bye = true;
                    }

                }

                // for byes or forfeit (the team that did not forfeit), the team gets the average score of all winning games that week and a win
                if (bye || forfeit)
                {

                    foreach (var match in db.Matches.Where(x => x.WeekId == week.Id))
                    {
                        GetTeamView? teamView = db.GetTeamViews
                        .FromSql($"Exec GetTeam {match.Id}")
                        .AsEnumerable()
                        .FirstOrDefault();

                        if (match.Rink != -1 && match.ForFeitId > 0)
                        {
                            var winner = list.Find(x => x.Team == (teamView?.Team == match.ForFeitId ? teamView?.Team1 : teamView?.Team));
                            winner.TotalScore += 14;
                        }
                        else if (match.Rink == -1 && match.ForFeitId != -1)
                        {
                            var winner = list.Find(x => x.Team == teamView?.Team);
                            winner.TotalScore += 14;
                        }
                    }
                }



            }

            int place = 1;
            int nextplace = 1;
            Standing previous = new Standing()
            {
                Loses = 0,
                TotalScore = 0,
                Wins = 0,
                Ties = 0,
                Byes = 0

            };
            foreach (var item in list)
            {
                var points = item.Wins * league.WinPoints +
                                   item.Ties * league.TiePoints + item.Byes * league.ByePoints;
                if (league.PointsCount)
                    item.TotalPoints = points * 1000 + item.TotalScore;
                else
                {
                    item.TotalPoints = points;
                    item.TotalScore = points;
                }

            }

            list.Sort((a, b) => (b.TotalPoints).CompareTo(a.TotalPoints));
            foreach (var item in list)
            {
                if (item.TotalPoints != previous.TotalPoints)
                {
                    place = nextplace;
                }
                previous = item;
                nextplace++;
            }
            return list;
        }
    }



    public class Standing
    {
        public int Team { get; set; }
        public string Players { get; set; } = "";
        public int TotalScore { get; set; } = 0;
        public int Wins { get; set; }
        public int Loses { get; set; }
        public int Ties { get; set; } = 0;
        public int Byes { get; set; }
        public short DivisionId { get; set; }
        public int TotalPoints { get; set; }
    }
}
    
