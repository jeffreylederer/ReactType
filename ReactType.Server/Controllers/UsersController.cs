using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactType.Server.Code;
using ReactType.Server.Models;



namespace ReactType.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DbLeagueApp _context;



        public UsersController(DbLeagueApp context)
        {
            _context = context;
        }

        // GET: Users
        [HttpGet]
        public async Task<IEnumerable<DTOUserRole>> Get()
        {
            var newList = new List<DTOUserRole>();  
            try
            {
                var list = await _context.Users.ToListAsync();
                foreach (var item in list)
                {
                    UserRole? userRole = await _context.UserRoles.Where(x => x.UserId == item.Id).FirstOrDefaultAsync();
                    newList.Add(new DTOUserRole(item, userRole.RoleId));
                    
                }
            }
            catch (Exception ex)
            {
                return newList;
            }
            return newList;
        }



        // GET: Users/Details/5
        [HttpGet("{id}")]
        public async Task<DTOUserRole?> Details(int? id)
        {
            if (id == null)
            {
                return null;
            }

            var User = await _context.Users.FindAsync(id.Value);
            if (User == null)
            {
                return null;
            }
            UserRole? userRole = await _context.UserRoles.Where(x => x.UserId == User.Id).FirstOrDefaultAsync();
            if(userRole != null)
            {
                DTOUserRole item = new DTOUserRole(User, userRole.RoleId);
                
                return item;
            }
            return null;

        }

        // GET: Users/Create
        [HttpPost]
        public async Task Create(DTOUserRole item)
        {
            var password = GetSha256Hash.Encode(item.Password);
            try
            {
                var user = new User()
                {
                    LastLoggedIn = null,
                    SerialNumber = Guid.NewGuid().ToString("N"),
                    Password = password,
                    IsActive = item.IsActive,
                    Username = item.Username,
                    DisplayName = item.DisplayName,

                };
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                var userRole = new UserRole() { RoleId = item.RoleId, UserId=user.Id };

                _context.UserRoles.Add(userRole);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                var message = ex.ToString();
            }


        }

        // GET: Users/Edit/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, DTOUserRole item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }
            User user = DTOUserRole.CreateUser(item);
            _context.Entry(user).State = EntityState.Modified;
            UserRole? userRole = await _context.UserRoles.Where(x => x.UserId == user.Id).FirstOrDefaultAsync();
            if (userRole != null )
            {
                _context.Add(new UserRole()
                {
                    UserId = id,
                    RoleId = item.RoleId
                });
                
            }
            else if(userRole != null)
            {
                userRole.RoleId = item.RoleId;
                _context.Entry(userRole).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // GET: Users/Delete/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Users.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Users.Remove(item);
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



        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
