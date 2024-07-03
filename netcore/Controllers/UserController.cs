using _net.Custom;
using _net.dtos;
using _net.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace _net.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class UserController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    public UserController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    [HttpGet]
    [Route("test")]
    [Authorize]
    public IActionResult GetTest()
    {
        string token = HttpContext.Request.Headers["Authorization"];

        return Ok(token);
    }

    [HttpPost]
    [Route("get-user-by-name")]
    public IActionResult GetUserByName([FromQuery] string? name, [FromBody] ExceptUser? exceptUser)
    {
        try
        {
            var users = _unitOfWork.UserRepository.GetAll(u => exceptUser.exceptIds.Contains(u.id) == false && u.name.Contains(name));
            return Ok(new
            {
                users = users
            });
        }
        catch (System.Exception ex)
        {
            return BadRequest();
        }
    }

    [HttpGet]
    [Route("get-user-by-chat-id")]
    public IActionResult GetUserByChatId([FromQuery] Guid id)
    {
        try
        {
            var chat = _unitOfWork.ChatRepository.Get(x => x.id == id, "memberChats");
            if (chat == null)
            {
                return NotFound();
            }
            return Ok(new
            {
                isGroup = chat.isGroup,
                memberChats = chat.memberChats
            });
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }
    [HttpGet]
    [Route("get-user-by-id")]
    public IActionResult GetUserById([FromQuery] Guid id)
    {
        try
        {
            // var chat = _unitOfWork.ChatRepository.Get(x => x.id == id, "memberChats");
            // if
            var user = _unitOfWork.UserRepository.Get(u => u.id == id);
            user.password = "";
            return Ok(new
            {
                user = user
            });
        }
        catch (Exception ex)
        {
            return BadRequest();
        }
    }
}