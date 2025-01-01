using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using ReactType.Server.Models;


namespace ReactType.Server.Code
{


    public class ByesReport
    {



        /// <summary>
        /// 
        /// </summary>
        /// <param name="id">leagueid</param>
        /// <param name="db">context</param>
        public IDocument CreateDocument(int id, DbLeagueApp db)
        {
            League? league = db.Leagues.Find(id);
            int? TeamSize = league?.TeamSize;
            List<GetByesView> teams = db.GetByesViews
                     .FromSql($"EXEC GetByes {id}")
                    .ToList();
            string LeagueName = league?.LeagueName;
           
            return Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Margin(25);


                    page.Header()
                    .Text(LeagueName)
                    .SemiBold().FontSize(24)
                    .AlignLeft()
                    .FontSize(20);

                    
                    page.Content()
                    .Table(table =>
                    {
                        table.Header(header =>
                        {
                            header.Cell().ColumnSpan(3).AlignCenter().Text("Byes").FontSize(15);
                        });
                        
                        // step 1
                        table.ColumnsDefinition(columns =>
                        {
                            columns.ConstantColumn(75); //date
                            columns.ConstantColumn(30); //rink
                            columns.ConstantColumn(150); //team1
                            
                        });


                        // step 3
                        table.Cell().Element(CellStyle2).Text("Date").SemiBold();
                        table.Cell().Element(CellStyle2).Text("Team").SemiBold();
                        table.Cell().Element(CellStyle2).Text("Players").SemiBold();

                        static IContainer CellStyle2(IContainer container)
                        {
                            return container.Border(1).BorderColor(Colors.Black).PaddingVertical(5).AlignCenter();
                        }

                        foreach (GetByesView item in teams)
                        {


                            table.Cell().Element(CellStyle).Text(item.GameDate.ToString());
                            table.Cell().Element(CellStyle).Text(item.TeamNo.ToString());
                            
                            
                            string team = item.Skip;
                            if (TeamSize == 2)
                                team += "," + item.Lead;
                            if (TeamSize == 3)
                                team += ", "+ item.ViceSkip+ "," + item.Lead;
                            table.Cell().Element(CellStyle).Text(team);

                            static IContainer CellStyle(IContainer container)
                            {
                                return container.Border(1).BorderColor(Colors.Black).PaddingVertical(5).AlignCenter();
                            }
                            

                        }
                        
                    });
                });
            });
        }
    }
}

