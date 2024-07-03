using System.ComponentModel.DataAnnotations;

namespace _net.dtos;
public class LoginDto
{
    [Required]
    [EmailAddress]
    public string email { get; set; }

    [Required]
    public string password { get; set; }
}

public class SigninDto
{

    [Required]
    public string name { get; set; }

    [Required]
    [EmailAddress]
    public string email { get; set; }

    [Required]
    public string password { get; set; }
}

public class ForgotPasswordDto
{

    [EmailAddress]
    public string email { get; set; }
}