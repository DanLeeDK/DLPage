using System.Linq;

namespace PrettyPetsAPI
{
    public class DbInitializer
    {
        public static void Initialize(PetDbContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.Pets.Any())
            {
                return; // DB has been seeded
            }
            
            var hope = new Pet
            {
                Name = "Hope",
                Town = "Aarhus",
                Age = 4
            };

            context.Pets.Add(hope);
            context.SaveChanges();
            
        }
    }
}
