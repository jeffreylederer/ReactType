using Microsoft.EntityFrameworkCore;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using ReactType.Server.Models;


namespace ReactType.Server.Code
{


    public class StandingsReport
    {



        /// <summary>
        /// 
        /// </summary>
        /// <param name="id">weekid</param>
        /// <param name="db">context</param>
        public IDocument CreateDocument(int id, DbLeagueApp db)
        {
            Schedule? schedule = db.Schedules.Find(id);
            League? league = db.Leagues.Find(schedule?.Leagueid);
            int? TeamSize = league?.TeamSize;
            List<GetMatchAllView> matches = db.GetMatchAllViews
                     .FromSql($"EXEC GetMatchAll {id}")
                    .ToList();
            string LeagueName = league?.LeagueName;
            string GameDate = schedule?.GameDate.ToShortDateString();
            return Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Margin(50);

                    page.Header()
                    .Text(LeagueName)
                    .SemiBold().FontSize(24);
                    

                    page.Content()
                    .Text("To be written");

                });
            });
        }
    }
}

