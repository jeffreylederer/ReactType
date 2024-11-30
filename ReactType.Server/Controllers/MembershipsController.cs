using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models;

// https://medium.com/@hassanjabbar2017/performing-crud-operations-using-react-with-net-core-a-step-by-step-guide-0176efa86934
namespace ReactType.Server.Controllers
{
    
    public class MembershipsController : Controller
    {
        private readonly DbLeagueApp _context;

        public MembershipsController(DbLeagueApp context)
        {
            _context = context;
        }

        // GET: Memberships
        [HttpGet]
        [Route("api/Memberships/Get")]
        public async Task<IEnumerable<Membership>> Get()
        {
            var list = await _context.Memberships.ToListAsync();
            list.Sort((a, b) => a.LastName.CompareTo(b.LastName));
            return list;
        }

        // GET: Memberships/Details/5
        [HttpGet()]
        [Route("api/Memberships/Details/{id}")]
        public async Task<Membership?> Get(int? id)
        {
            if (id == null)
            {
                return null;
            }

            var list = await _context.Memberships
                .FirstOrDefaultAsync(m => m.Id == id);
            if (list == null)
            {
                return null;
            }

            return list;
        }




        // POST: Memberships/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[Bind("Id,FirstName,LastName,FullName,Shortname,NickName,Wheelchair")]
        [HttpPut]
        //[ValidateAntiForgeryToken]
        [Route("api/Memberships/Create")]
        public async Task<ActionResult<Membership>> Create(Membership item)
        {
            _context.Memberships.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Membership), new { id = item.Id }, item);
        }



        // POST: Memberships/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPut]   
        //[ValidateAntiForgeryToken]
        [Route("api/Memberships/Edit")]
        public async Task<IActionResult> Edit(Membership item)
        {
            //if (id != item.Id)
            //{
            //    return BadRequest();
            //}

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!MembershipExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}
            catch(Exception ex)
            {
                var mess = ex.Message;
            }

            return NoContent();
        }

       
        // GET: Memberships/Delete/5
        [HttpDelete]
        [Route("api/Memberships/Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Memberships.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Memberships.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MembershipExists(int id)
        {
            return _context.Memberships.Any(e => e.Id == id);
        }
    }
}
