using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
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
    public class SchedulesController : ControllerBase
    {
        private readonly DbLeagueApp _context;

        public SchedulesController(DbLeagueApp context)
        {
            _context = context;
        }

        // GET: Schedules
        [HttpGet("{id}")]
        public async Task<IEnumerable<Schedule>> Get(int id)
        {
            var list = await _context.Schedules.Where(x=>x.Leagueid==id).ToListAsync();
            list.Sort((a, b) => a.GameDate.CompareTo(b.GameDate));
            return list;
        }

        // GET: Schedules/Details/5
        [HttpGet("getOne/{id}")]
        public async Task<Schedule?> GetOne(int? id)
        {
            if (id == null)
            {
                return null;
            }

            var schedule = await _context.Schedules.FindAsync(id.Value);
            if (schedule == null)
            {
                return null;
            }

            return schedule;
        }

       
        [HttpPost]
        public async Task Create(Schedule item)
        {
            _context.Schedules.Add(item);
            await _context.SaveChangesAsync();

           
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, Schedule item)
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
                if (!ScheduleExists(id))
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


        // GET: Schedules/Delete/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Schedules.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Schedules.Remove(item);
            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        private bool ScheduleExists(int id)
        {
            return _context.Schedules.Any(e => e.Id == id);
        }
    }
}
