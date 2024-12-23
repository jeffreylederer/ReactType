using System;
using System.Collections.Generic;

namespace ReactType.Server.Models;

public partial class OneMatchWeekView
{
    public int Id { get; set; }

    public int Rink { get; set; }

    public string? Team1 { get; set; }

    public string? Team2 { get; set; }

    public bool? Wheelchair1 { get; set; }

    public bool? Wheelchair2 { get; set; }

    public int Team1Score { get; set; }

    public int Team2Score { get; set; }

    public int ForFeitId { get; set; }

    public int Weekid { get; set; }

    public int Team1No { get; set; }

    public int Team2No { get; set; }
}
