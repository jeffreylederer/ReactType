using Microsoft.AspNetCore.Hosting.Server;
using ReactType.Server.Models;
using System;

namespace ReactType.Server.Code
{
    public class DTOUserRole : User
    {

        public int RoleId { get; set; }

        public int Id { get; set; }

        public string Username { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string DisplayName { get; set; } = null!;

        public bool IsActive { get; set; }

        public DateTimeOffset? LastLoggedIn { get; set; }

        public string SerialNumber { get; set; } = null!;
        public string Role { get; set; } = null!;

        public DTOUserRole(User user, int roleid)
        {
            Id = user.Id;
            Username = user.Username;
            Password = user.Password;
            DisplayName = user.DisplayName;
            IsActive = user.IsActive;
            LastLoggedIn = user.LastLoggedIn;
            SerialNumber = user.SerialNumber;
            RoleId = roleid;
            Role = RoleLookup(roleid);
        }

        public static string RoleLookup(int roleid)
        {
            switch (roleid)
            {
                case 1: return "Observer";
                case 2: return "Scorer";
                case 3: return "Admin";
                case 4: return "SiteAdmin";
            }
            return "";
        }

        public static User CreateUser(DTOUserRole item)
        {
            var user = new User();
            user.Id = item.Id;
            user.Username = item.Username;
            user.Password = item.Password;
            user.DisplayName = item.DisplayName;
            user.IsActive = item.IsActive;
            user.LastLoggedIn = item.LastLoggedIn;
            return user;
        }

    }


}
