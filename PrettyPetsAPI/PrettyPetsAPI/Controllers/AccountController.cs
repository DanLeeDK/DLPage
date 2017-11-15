using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrettyPetsAPI.Models;
using PrettyPetsAPI.Viewmodels;
using System.Linq;
using System.Threading.Tasks;

namespace PrettyPetsAPI.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly PetDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public AccountController(UserManager<AppUser> userManager, IMapper mapper, PetDbContext context)
        {
            _userManager = userManager;
            _mapper = mapper;
            _context = context;
        }

        // POST api/account
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == model.Email);
            if (user != null)
            {
                return BadRequest("Username already exist");
            }

            var userIdentity = _mapper.Map<AppUser>(model);

            userIdentity.UserName = userIdentity.Email;

            var result = await _userManager.CreateAsync(userIdentity, model.Password);

            if (!result.Succeeded) return BadRequest("Account creation failed");

            await _context.PetOwners.AddAsync(new PetOwner {IdentityId = userIdentity.Id, City = model.City});
            await _context.SaveChangesAsync();

            return new OkObjectResult("Account created");
        }

        public JsonResult doesUserNameExist(string UserName)
        {
            var user = _userManager.Users.FirstOrDefault(u => u.UserName == UserName);

            return Json(user == null);
        }
    }
}