using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ReactType.Server.Models;

// https://medium.com/@hassanjabbar2017/performing-crud-operations-using-react-with-net-core-a-step-by-step-guide-0176efa86934
namespace ReactType.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MatchesController : ControllerBase
    {
        private readonly DbLeagueApp _context;

        public MatchesController(DbLeagueApp context)
        {
            _context = context;
        }

        // GET: Matches
        [HttpGet]
        public async Task<IEnumerable<OneMatchWeekView>?> Get(int id)
        {
            var list = await _context.OneMatchWeekViews
                     .FromSql($"EXEC OneMatchWeek {id}")
                    .ToListAsync();
            return list;
        }

        // GET: Matches/Details/5
        [HttpGet("{id}")]
        public async Task<Match?> Get(int? id)
        {
            if (id == null)
            {
                return null;
            }

            var match = await _context.Matches.FindAsync(id.Value);
            if (match == null)
            {
                return null;
            }

            return match;
        }




        
        [HttpPost]
        public async Task Create(Match item)
        {
            _context.Matches.Add(item);
            await _context.SaveChangesAsync();

           
        }



        // POST: Matches/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[ValidateAntiForgeryToken]
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, Match item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MembershipExists(id))
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


        // GET: Matches/Delete/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Matches.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Matches.Remove(item);
            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateException ex1)
            {
                return StatusCode(409, "Member cannot be deleted, the member is already assign to a league.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        private bool MembershipExists(int id)
        {
            return _context.Matches.Any(e => e.Id == id);
        }
    }
}
