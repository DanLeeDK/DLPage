<<<<<<< HEAD
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PrettyPetsAPI.Models
{
    public class AppUser
    {
=======
﻿using Microsoft.AspNetCore.Identity;

namespace PrettyPetsAPI.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }
>>>>>>> UserAuthentication
    }
}
