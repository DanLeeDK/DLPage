using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace PrettyPetsAPI.Services
{
    public class TokenHelper : ITokenHelper
    {
        private readonly IOptions<TokenOptions> _tokenOptions;

        public TokenHelper(IOptions<TokenOptions> tokenOptions)
        {
            _tokenOptions = tokenOptions;
        }

        /// <summary>
        /// Generates a token for a user
        /// </summary>
        /// <param name="username">Username to generate token for</param>
        /// <returns>Unsigned JSON Web Token</returns>
        public JwtSecurityToken GenerateAccessToken(string username)
        {
            IEnumerable<Claim> claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var accessToken = new JwtSecurityToken(
                issuer: _tokenOptions.Value.Issuer,
                audience: _tokenOptions.Value.Audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(_tokenOptions.Value.TokenExpirationInMinutes),
                signingCredentials: _tokenOptions.Value.Credentials
            );
            return accessToken;
        }
    }
}
