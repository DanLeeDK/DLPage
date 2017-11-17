using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PrettyPetsAPI.Models;
using PrettyPetsAPI.Services;
using PrettyPetsAPI.Viewmodels;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;

namespace Presentation.Web.API.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly ITokenHelper _tokenHelper;
        private readonly JwtSecurityTokenHandler _tokenHandler;
        private readonly IPasswordHasher<AppUser> _passwordHasher;
        private readonly UserManager<AppUser> _userManager;

        public AuthController(ITokenHelper tokenHelper, JwtSecurityTokenHandler tokenHandler
           , IPasswordHasher<AppUser> passwordHasher, UserManager<AppUser> userManager)
        {
            _tokenHelper = tokenHelper;
            _tokenHandler = tokenHandler;
            _passwordHasher = passwordHasher;
            _userManager = userManager;
        }

        /// <summary>
        /// Generates a token after verifying active directory username and password
        /// </summary>
        /// <param name="model">Username and password</param>
        /// <returns>A JSON Web Token</returns>
        /// // POST api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> GetToken([FromForm]CredentialsViewModel credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(credentials.Username);

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, credentials.Password);
            if (result != PasswordVerificationResult.Success)
            {
                return Unauthorized();
            }

            var accessToken = _tokenHelper.GenerateAccessToken(credentials.Username);
            var token = _tokenHandler.WriteToken(accessToken);

            var responseModel = new JwtViewModel { Jwt = token };
            return Ok(responseModel);
        }
    }
}