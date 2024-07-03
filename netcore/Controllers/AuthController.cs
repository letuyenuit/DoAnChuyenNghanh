using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using _net.dtos;
using _net.Models;
using _net.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Bcrypt = BCrypt.Net.BCrypt;
namespace _net.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private IConfiguration _config;

    public AuthController(IConfiguration config, IUnitOfWork unitOfWork)
    {
        _config = config;
        _unitOfWork = unitOfWork;
    }
    [AllowAnonymous]
    [HttpPost]
    [Route("login")]
    public IActionResult Login([FromBody] LoginDto loginDto)
    {
        IActionResult response = Unauthorized();
        var user = _unitOfWork.UserRepository.Get(u => u.email == loginDto.email);

        if (user != null)
        {
            var checkPassword = Bcrypt.Verify(loginDto.password, user.password);
            if (checkPassword)
            {
                var tokenString = GenerateJSONWebToken(user);
                user.password = "";
                response = Ok(new { token = tokenString, user = user });
            }

        }

        return response;
    }

    [AllowAnonymous]
    [HttpPost]
    [Route("signup")]
    public IActionResult Signup([FromBody] SigninDto signinDto)
    {
        try
        {
            var user = _unitOfWork.UserRepository.Get(u => u.email == signinDto.email);
            if (user == null)
            {
                user = new User
                {
                    name = signinDto.name,
                    email = signinDto.email,
                    password = Bcrypt.HashPassword(signinDto.password)
                };
                _unitOfWork.UserRepository.Add(user);
                _unitOfWork.Save();
            }
            return Ok(new { message = "User created successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }


    [Authorize]
    [HttpGet]
    [Route("my-profile")]
    public IActionResult GetMyProfile()
    {
        try
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
            if (userId == null) return Unauthorized();
            var user = _unitOfWork.UserRepository.Get(u => u.id == new Guid(userId));
            user.password = "";
            return Ok(user);
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    [AllowAnonymous]
    [HttpPost]
    [Route("forgot-password")]
    public IActionResult ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
    {
        try
        {
            var findUser = _unitOfWork.UserRepository.Get(x => x.email == forgotPasswordDto.email);
            if (findUser == null)
            {
                return NotFound();
            }

            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }

    private string GenerateJSONWebToken(User userInfo)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[] {
        new Claim("id", userInfo.id.ToString()),
    };
        var token = new JwtSecurityToken(_config["Jwt:Issuer"],
            _config["Jwt:Issuer"],
            claims,
            expires: DateTime.UtcNow.AddMonths(2),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
