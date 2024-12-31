using Microsoft.EntityFrameworkCore;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using ReactType.Server.Models;


namespace ReactType.Server.Code
{


    public class TeamReportDoc 
    {
               

       

        public IDocument CreateDocument(int id, DbLeagueApp db)
        {
            League? league = db.Leagues.Find(id);

            string LeagueName = league?.LeagueName;
            int? TeamSize = league?.TeamSize;
            List<TeamMember> list = db.TeamMembers
                     .FromSql($"EXEC TeamAllowDelete {id}")
                    .ToList();
            list.Sort((a, b) => a.TeamNo.CompareTo(b.TeamNo));


            return Document.Create(container =>
            {
                container.Page(page =>
            {
                page.Margin(50);

                page.Header()
                    .Text(LeagueName)
                    .SemiBold().FontSize(24);


                page.Content()
                .Table(table =>
                {
                    // step 1
                    table.ColumnsDefinition(columns =>
                    {
                        columns.ConstantColumn(50);
                        columns.ConstantColumn(50);
                        columns.ConstantColumn(150);
                        if (TeamSize.Value == 3)
                        {
                            columns.ConstantColumn(150);
                        }
                        if (TeamSize.Value > 1)
                        {
                            columns.ConstantColumn(150);
                        }
                    });




                    // step 3
                    table.Cell().Element(CellStyle2).Text("Division").SemiBold();
                    table.Cell().Element(CellStyle2).Text("Team No").SemiBold();
                    table.Cell().Element(CellStyle2).Text("Skip").SemiBold();
                    if (TeamSize.Value == 3)
                    {
                        table.Cell().Element(CellStyle2).Text("Vice Skip").SemiBold();
                    }
                    if (TeamSize.Value > 1)
                    {
                        table.Cell().Element(CellStyle2).Text("Lead").SemiBold();
                    }

                    static IContainer CellStyle2(IContainer container)
                    {
                        return container.Border(1).BorderColor(Colors.Black).PaddingVertical(5).AlignCenter();
                    }

                    foreach (var item in list)
                    {


                        table.Cell().Element(CellStyle).Text(item.Division);
                        table.Cell().Element(CellStyle).Text(item.TeamNo);
                        table.Cell().Element(CellStyle1).AlignRight().Text(item.Skip);
                        if (TeamSize.Value == 3)
                        {
                            table.Cell().Element(CellStyle1).Text(item.ViceSkip);
                        }
                        if (TeamSize.Value > 1)
                        {
                            table.Cell().Element(CellStyle1).Text(item.Lead);
                        }

                        static IContainer CellStyle(IContainer container)
                        {
                            return container.Border(1).BorderColor(Colors.Black).PaddingVertical(5).AlignCenter();
                        }
                        static IContainer CellStyle1(IContainer container)
                        {
                            return container.Border(1).BorderColor(Colors.Black).PaddingVertical(5).AlignRight();
                        }
                    }
                });
            });
            });
        }
    }
}


