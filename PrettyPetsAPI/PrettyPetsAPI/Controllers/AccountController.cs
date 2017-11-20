using System;
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

            GiveUserUppercase(userIdentity);

            var result = await _userManager.CreateAsync(userIdentity, model.Password);

            if (!result.Succeeded) return BadRequest("Account creation failed");

            await _context.PetOwners.AddAsync(new PetOwner {IdentityId = userIdentity.Id, City = model.City});
            await _context.SaveChangesAsync();

            return new OkObjectResult("Account created");
        }

        public void GiveUserUppercase(AppUser user)
        {
            user.FirstName = FirstCharToUpper(user.FirstName);
            user.LastName = FirstCharToUpper(user.LastName);
            user.City = FirstCharToUpper(user.City);
        }

        public static string FirstCharToUpper(string input)
        {
            switch (input)
            {
                case null: throw new ArgumentNullException(nameof(input));
                case "": throw new ArgumentException($"{nameof(input)} cannot be empty", nameof(input));
                default: return input.First().ToString().ToUpper() + input.Substring(1);
            }
        }

        public JsonResult doesUserNameExist(string UserName)
        {
            var user = _userManager.Users.FirstOrDefault(u => u.UserName == UserName);

            return Json(user == null);
        }
    }
}