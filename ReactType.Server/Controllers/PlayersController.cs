﻿using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ReactType.Server.Models;
using ReactType.Server.Code;

// https://medium.com/@hassanjabbar2017/performing-crud-operations-using-react-with-net-core-a-step-by-step-guide-0176efa86934
namespace ReactType.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayersController : ControllerBase
    {
        private readonly DbLeagueApp _context;

        public PlayersController(DbLeagueApp context)
        {
            _context = context;
        }

        // GET: Players
        [HttpGet]
        public async Task<IEnumerable<PlayerMembership>> Get()
        {
            var list = await (
                from a in _context.Players
                join b in _context.Memberships on a.MembershipId equals b.Id
                select new PlayerMembership()
                {
                    id = a.Id,
                    FullName = b.FullName,
                    LastName = b.LastName
                })
                .OrderBy(x=>x.LastName)
                .ToListAsync();
  
            return list;
        }

        // GET: Players/Details/5
        [HttpGet("{id}")]
        public async Task<PlayerMembership?> Get(int? id)
        {
            if (id == null)
            {
                return null;
            }

            var Player = await (
                from a in _context.Players
                join b in _context.Memberships on a.MembershipId equals b.Id
                where (a.Id == id)
                select new PlayerMembership()
                {
                    id = a.Id,
                    FullName = b.FullName,
                    LastName = b.LastName
                })
                .OrderBy(x => x.LastName)
                .FirstOrDefaultAsync();
            if (Player == null)
            {
                return null;
            }

            return Player;
        }


     
        [HttpPost]
        public async Task Create(Player item)
        {
            _context.Players.Add(item);
            await _context.SaveChangesAsync();

           
        }


        // GET: Players/Delete/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Players.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Players.Remove(item);
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
        
    }
}