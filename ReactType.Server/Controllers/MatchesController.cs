﻿using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Data.SqlClient;
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
        [HttpGet("{id}")]
        public async Task<IEnumerable<OneMatchWeekView>?> Get(int id)
        {
            var list = await _context.OneMatchWeekViews
                     .FromSql($"EXEC OneMatchWeek {id}")
                    .ToListAsync();
            return list;
        }

        // GET: Matches
        [HttpGet("Reorder{id}")]
        public async Task<IActionResult> GetReorder(int id)
        {
            var match = _context.Matches.Find(id);
            if (match == null)
                return NotFound();
            var weekMatches = _context.Matches.Where(x => x.WeekId == match.WeekId);
            var match1 = weekMatches.First(x => x.Rink == match.Rink - 1);
            match1.Rink = match.Rink;
            match.Rink = match1.Rink - 1;
            _context.Entry(match).State = EntityState.Modified;
            try
            {
               _context.SaveChanges();
            }
            catch(Exception ex)
            {
                return StatusCode(409,ex.Message);
            }


            return Ok();
        }

        // GET: Matches/Details/5
        [HttpGet("getOne/{id}")]
        public async Task<OneMatchWeekView?> Get(int? id)
        {
            if (id == null)
            {
                return null;
            }
            try
            {
                SqlParameter[] parameters = {
                    new SqlParameter("matchid", id)
                };
                var match = _context.OneMatchWeekViews
                         .FromSqlRaw("EXEC OneMatch @matchid", parameters)
                         .AsEnumerable()
                         .FirstOrDefault();
                if (match == null)
                {
                    return null;
                }
                return match;
            }
            catch(Exception ex)
            {
                var mess = ex.Message;
            }
            return null;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, MatchType item)
        {
            if (id != item.id)
            {
                return BadRequest();
            }

            var match = _context.Matches.Find(id);
            if (match == null)
            {
                return NotFound();
            }
            match.Team1Score = item.team1Score;
            match.Team2Score = item.team2Score;
            match.ForFeitId = item.forFeitId;

            _context.Entry(match).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatchExists(id))
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


       

        private bool MatchExists(int id)
        {
            return _context.Matches.Any(e => e.Id == id);
        }
    }

    public class MatchType
    {
        public int id { get; set; }
        public int team1Score { get; set; }
        public int team2Score { get; set; }
        public int forFeitId { get; set; }
    }

}
