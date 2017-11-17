using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using PrettyPetsAPI.Viewmodels;

namespace PrettyPetsAPI.Controllers
{
    [Route("api/[controller]")]
    public class PetsController : Controller
    {
        private readonly PetDbContext _context;
        private readonly IConfiguration _configuration;

        public PetsController(PetDbContext context, IConfiguration configuration)
        {
            _context = context;
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

        // POST api/pets
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] PetPostViewmodel model, IFormFile image)
        {
            
            var path = Path.Combine(
                Directory.GetCurrentDirectory(), "wwwroot/PetImages", image.FileName);

            using (var fileStream = new FileStream(path, FileMode.Create))
            {
                await image.CopyToAsync(fileStream);
            }
            var pet = new Pet()
            {
                Name = model.Name,
                Town = model.Town,
                Age = model.Age,
                Image = (_configuration.GetConnectionString("ImageFolder") + image.FileName)
            };
            _context.Pets.Add(pet);
            _context.SaveChanges();
            return Ok();
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