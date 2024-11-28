using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models;


namespace ReactType.Server.Controllers
{
    public class LeaguesController : Controller
    {
        private readonly DbLeagueApp _context;
        private readonly ILogger<LeaguesController> _logger;


        public LeaguesController(DbLeagueApp context, ILogger<LeaguesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: Leagues
        //[HttpGet(Name = "GetLeagues")]
        [HttpGet]
        [Route("api/League/Get")]
        public async Task<IEnumerable<League>> Get()
        {
            var list = await _context.Leagues.ToArrayAsync(); 
            return list;
        }

        [HttpGet]
        [Route("api/League/GetActive")]
        public async Task<IEnumerable<League>> GetActive()
        {
            var list = await _context.Leagues
                .Where(x=>x.Active)
                .ToArrayAsync();
            return list;
        }

        // GET: Leagues/Details/5
        [HttpGet]
        [Route("api/League/Details")]
        public async Task<League?> Details(int? id)
        {
            if (id == null)
            {
                return null;
            }

            var league = await _context.Leagues
                .FirstOrDefaultAsync(m => m.Id == id);
            if (league == null)
            {
                return null;
            }

            return league;
        }

        // GET: Leagues/Create
        //public IActionResult Create()
        //{
        //    ViewData["StartWeek"] = new SelectList(_context.RinkOrders, "Id", "Id");
        //    return View();
        //}

        // POST: Leagues/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<League?> Create([Bind("Id,LeagueName,Active,TeamSize,TiesAllowed,PointsCount,WinPoints,TiePoints,ByePoints,StartWeek,PointsLimit,Divisions,PlayOffs")] League league)
        {
            if (ModelState.IsValid)
            {
                _context.Add(league);
                await _context.SaveChangesAsync();
                return null;
            }
            //ViewData["StartWeek"] = new SelectList(_context.RinkOrders, "Id", "Id", league.StartWeek);
            return league;
        }

        // GET: Leagues/Edit/5
        public async Task<League?> Edit(int? id)
        {
            if (id == null)
            {
                return null;
            }

            var league = await _context.Leagues.FindAsync(id);
            if (league == null)
            {
                return null;
            }
            //ViewData["StartWeek"] = new SelectList(_context.RinkOrders, "Id", "Id", league.StartWeek);
            return league;
        }

        // POST: Leagues/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<League?> Edit(int id, [Bind("Id,LeagueName,Active,TeamSize,TiesAllowed,PointsCount,WinPoints,TiePoints,ByePoints,StartWeek,PointsLimit,Divisions,PlayOffs")] League league)
        {
            if (id != league.Id)
            {
                return null;
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(league);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!LeagueExists(league.Id))
                    {
                        return null;
                    }
                    else
                    {
                        throw;
                    }
                }
                return league;
            }
            //ViewData["StartWeek"] = new SelectList(_context.RinkOrders, "Id", "Id", league.StartWeek);
            return null;
        }

        // GET: Leagues/Delete/5
        public async Task<League?> Delete(int? id)
        {
            if (id == null)
            {
                return null;
            }

            var league = await _context.Leagues
                .Include(l => l.StartWeekNavigation)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (league == null)
            {
                return null;
            }

            return league;
        }

        // POST: Leagues/Delete/5
        //[HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<Boolean> DeleteConfirmed(int id)
        {
            var league = await _context.Leagues.FindAsync(id);
            if (league != null)
            {
                _context.Leagues.Remove(league);
            }

            await _context.SaveChangesAsync();
            return true;
        }

        private bool LeagueExists(int id)
        {
            return _context.Leagues.Any(e => e.Id == id);
        }
    }
}
