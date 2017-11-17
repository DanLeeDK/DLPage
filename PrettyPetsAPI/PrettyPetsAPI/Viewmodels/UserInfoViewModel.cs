using System.ComponentModel.DataAnnotations;

namespace PrettyPetsAPI.Viewmodels
{
    public class UserIdViewModel
    {
        [Required]
        [Display(Name = "Id")]
        public int Id { get; set; }
    }
}
