using System.IdentityModel.Tokens.Jwt;

namespace PrettyPetsAPI.Services
{
    public interface ITokenHelper
    {
        JwtSecurityToken GenerateAccessToken(string username);
    }
}
