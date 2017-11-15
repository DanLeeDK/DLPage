using System.ComponentModel.DataAnnotations;
public class CredentialsViewModel
    {
    [Required(ErrorMessage = "UsernameRequired")]
        [Display(Name = "Username")]
        public string Username { get; set; }

        [Required(ErrorMessage = "PasswordRequired")]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
}

