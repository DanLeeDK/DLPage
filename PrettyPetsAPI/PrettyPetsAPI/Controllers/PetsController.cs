using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using PrettyPetsAPI.Models;
using PrettyPetsAPI.Viewmodels;

namespace PrettyPetsAPI.Controllers
{
    [Route("api/[controller]")]
    public class PetsController : Controller
    {
        private readonly PetDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _configuration;

        public PetsController(PetDbContext context, UserManager<AppUser> userManager, IConfiguration configuration)
        {
            _context = context;
            _userManager = userManager;
            _configuration = configuration;
        }

        // GET api/pets
        [HttpGet]
        public async Task<IEnumerable<Pet>> Get()
        {
            return await _context.Pets.ToListAsync();
        }

        // GET api/pets/5
        [HttpGet("{id}")]
        public async Task<Pet> Get(int id)
        {
            return await _context.Pets.FirstOrDefaultAsync(p => p.Id == id);
        }

        // GET api/pets/5
        [HttpGet("Mypets")]
        public async Task<List<Pet>> MyPets()
        {
            var currentAppuser = await _userManager.FindByEmailAsync(_userManager.GetUserId(User));
            var currentUser = await _context.PetOwners.Include(u => u.Pets).Where(u => u.IdentityId == currentAppuser.Id).SingleOrDefaultAsync();
            return currentUser.Pets;
        }

        // POST api/pets
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] PetPostViewmodel model, IFormFile image)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var currentAppuser = await _userManager.FindByEmailAsync(_userManager.GetUserId(User));
            var currentUser = await _context.PetOwners.Include(u => u.Pets).Where(u => u.IdentityId == currentAppuser.Id).SingleOrDefaultAsync();

            var path = Path.Combine(
                Directory.GetCurrentDirectory(), "wwwroot/PetImages", image.FileName);

            using (var fileStream = new FileStream(path, FileMode.Create))
            {
                await image.CopyToAsync(fileStream);
            }
            var pet = new Pet()
            {
                Name = FirstCharToUpper(model.Name),
                Town = FirstCharToUpper(model.Town),
                Age = model.Age,
                Image = (_configuration.GetConnectionString("ImageFolder") + image.FileName)
            };

            currentUser.Pets.Add(pet);
            await _context.SaveChangesAsync();
            return Ok(pet);
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

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/pets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var pet = await _context.Pets.FirstOrDefaultAsync(p => p.Id == id);

            _context.Pets.Remove(pet);
            _context.SaveChanges();

            return Ok();
        }
    }
}