using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace PrettyPetsAPI.Viewmodels
{
    public class RegistrationViewModel
    {
        [Required]
        [Display(Name = "Firstname")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "Lastname")]
        public string LastName { get; set; }

        [Required]
        [Remote("doesUserNameExist", "Account",
            ErrorMessage = "User name already exists. Please enter a different user name.")]
        [Display(Name = "Email")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [Display(Name = "City")]
        public string City { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.",
            MinimumLength = 5)]
        [Display(Name = "Password")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}