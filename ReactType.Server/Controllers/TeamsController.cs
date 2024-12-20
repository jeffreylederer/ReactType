using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using ReactType.Server.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

// https://medium.com/@hassanjabbar2017/performing-crud-operations-using-react-with-net-core-a-step-by-step-guide-0176efa86934
namespace ReactType.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamsController : ControllerBase
    {
        private readonly DbLeagueApp _context;

        public TeamsController(DbLeagueApp context)
        {
            _context = context;
        }

        // GET: Teams
        [HttpGet("{id}")]
        public async Task<IEnumerable<TeamMember>> Get(int id)
        {
            var list = await _context.TeamMembers
                     .FromSql($"EXEC TeamAllowDelete {id}")
                    .ToListAsync();
            list.Sort((a, b) => a.TeamNo.CompareTo(b.TeamNo));
            return list;
        }

        // GET: Players/Details/5
        [HttpGet("NotOnTeam/{id}")]
        public async Task<IEnumerable<Membership>> NotOnTeam(int id)
        {
            List<Membership> list = await _context.Memberships
                     .FromSql($"EXEC NotOnTeam {id}")
                    .ToListAsync();
            list.Sort((a, b) => a.LastName.CompareTo(b.LastName));
            return list;
        }

        // GET: Teams/Details/5
        [HttpGet("getOne/{id}")]
        public OneTeamView? GetOne(int? id)
        {
            if (id == null)
            {
                return null;
            }

            try
            {
                SqlParameter[] parameters = {
                    new SqlParameter("leagueid", id)
                };
                var team = _context.OneTeamViews
                         .FromSqlRaw("EXEC OneTeam @leagueid", parameters)
                         .AsEnumerable()
                         .FirstOrDefault();
                         

                if (team == null)
                {
                    return null;
                }
                
                return team;
            }
            catch(Exception ex)
            {
                var mess = ex.Message;
            }
            return null;
        }


        [HttpPost]
        public async Task Create(Team item)
        {
            
            _context.Teams.Add(item);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                var message = ex.Message;
            }


        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, Team item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            var Team = new Team()
            {
                Id = item.Id,
               
            };

            _context.Entry(Team).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeamExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
            return NoContent();
        }


        // GET: Teams/Delete/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Teams.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Teams.Remove(item);
            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        private bool TeamExists(int id)
        {
            return _context.Teams.Any(e => e.Id == id);
        }
    }

    public partial class TeamType
    {
        public int Id { get; set; }

        public string? GameDate { get; set; }

        public int Leagueid { get; set; }

        public bool Cancelled { get; set; }

        public bool PlayOffs { get; set; }
    }

    public partial class TeamTypeCreate
    {
        public string? GameDate { get; set; }

        public string? Leagueid { get; set; }

        public bool Cancelled { get; set; }

        public bool PlayOffs { get; set; }
    }
}
