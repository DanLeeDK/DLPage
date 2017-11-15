using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PrettyPetsAPI.Models;

namespace PrettyPetsAPI
{
    public class PetDbContext : IdentityDbContext<AppUser>
    {
        public DbSet<Pet> Pets { get; set; }
        public DbSet<PetOwner> PetOwners  { get; set; }

        public PetDbContext(DbContextOptions options) : base(options) // Bruger de options som er sat i Startup ConfigureServices
        {

        }
    }
}
