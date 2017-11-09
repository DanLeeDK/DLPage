using Microsoft.EntityFrameworkCore;

namespace PrettyPetsAPI
{
    public class PetDbContext : DbContext
    {
        public DbSet<Pet> Pets { get; set; }

        public PetDbContext(DbContextOptions options) : base(options) // Bruger de options som er sat i Startup ConfigureServices
        {

        }
    }
}
