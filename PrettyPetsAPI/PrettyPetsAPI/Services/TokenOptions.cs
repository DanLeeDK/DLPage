using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace PrettyPetsAPI.Services
{
    /// <summary>
    /// Options for JSON Web Token
    /// </summary>
    public class TokenOptions
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public SigningCredentials Credentials { get; set; }
        public int TokenExpirationInMinutes { get; set; }
    }
}
