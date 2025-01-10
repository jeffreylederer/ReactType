using Microsoft.AspNetCore.Hosting.Server;
using ReactType.Server.Models;
using System;

namespace ReactType.Server.Code
{
    

       

    public class DTOUserRoleCreate
    {
        public string? Username { get; set; }

        public string? Password { get; set; }

        public string? DisplayName { get; set; }

        public bool IsActive { get; set; }

        public int RoleId { get; set; }
    }

    public class DTOUserRoleUpdate
    {
        public int Id { get; set; } 

        public string? DisplayName { get; set; }

        public bool IsActive { get; set; }

        public int RoleId { get; set; }
        
    }

    public class DTOUserRoleDetails
    {
        public int Id { get; set; }

        public string? UserName { get; set; }

        public string? DisplayName { get; set; }

        public bool IsActive { get; set; }

        public string? Role { get; set; }
        public int? RoleId { get; set; }
    }

}
