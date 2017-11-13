using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PrettyPetsAPI;
using PrettyPetsAPI.Models;
using PrettyPetsAPI.Viewmodels;

namespace Presentation.Web.API.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly PetDbContext _context;
        private readonly IMapper _mapper;

        public AuthController(PetDbContext context, IMapper mapper, UserManager<AppUser> userManager)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }

        /// <summary>
        /// Generates a token after verifying active directory username and password
        /// </summary>
        /// <param name="model">Username and password</param>
        /// <returns>A JSON Web Token</returns>
        [HttpPost("login")]
        public async Task<IActionResult> GetToken([FromBody]RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdentity = _mapper.Map<AppUser>(model);
            var result = await _userManager.CreateAsync(userIdentity, model.Password);

            if (!result.Succeeded) return BadRequest("Login failed");

            await _context.PetOwners.AddAsync(new PetOwner() { IdentityId = userIdentity.Id, City = model.City });
            await _context.SaveChangesAsync();

            return new OkResult();
        }
    }
}