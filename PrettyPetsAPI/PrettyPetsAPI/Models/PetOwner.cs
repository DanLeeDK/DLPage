using System.Collections.Generic;

namespace PrettyPetsAPI.Models
{
    public class PetOwner
    {
        public int Id { get; set; }
        public string IdentityId { get; set; }
        public string City { get; set; }

        public AppUser Identity { get; set; }  // navigation property
        public List<Pet> Pets { get; set; }
    }
}
