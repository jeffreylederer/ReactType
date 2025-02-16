﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactType.Server.Models;

namespace ReactType.Server.Controllers
{
    public class RolesController : Controller
    {
        private readonly DbLeagueApp _context;



        public RolesController(DbLeagueApp context)
        {
            _context = context;
        }

        // GET: Leagues
        [HttpGet]
        public async Task<IEnumerable<Role>?> Get()
        {
            try
            {
                var list = await _context.Roles.ToArrayAsync();
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

    }
}
