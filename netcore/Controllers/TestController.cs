using Microsoft.AspNetCore.Mvc;

namespace _net.Controllers;
[Route("api/[controller]")]
[ApiController]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            from = "LE TUYEN",
            message = "ECS deployment from LE TUYEN"
        });
    }
}