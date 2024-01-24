using System.ComponentModel.DataAnnotations;

namespace CookiesMVC.Models;

public class RegisterDTO
{
    public string Password { get; set; }
    
    [Compare("Password", ErrorMessage = "Pas Pareil")]
    public string PasswordConfirm { get; set; }

    public string UserName { get; set; }
    
    public string Email { get; set; }
}