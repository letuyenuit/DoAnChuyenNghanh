using _net.dtos;
using _net.Models;
using _net.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace _net.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class MessageController : ControllerBase
{
	private readonly IUnitOfWork _unitOfWork;
	public MessageController(IUnitOfWork unitOfWork)
	{
		_unitOfWork = unitOfWork;
	}


	[HttpPost]
	[Route("reaction-message")]
	public IActionResult ReactionMessage([FromBody] ReactionDto reactionDto)
	{
		try
		{
			string myId = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
			var findMessage = _unitOfWork.MessageRepository.Get(x => x.id == reactionDto.idMessage);
			if (findMessage == null)
			{
				return NotFound();
			}
			var reactionMessage = _unitOfWork.ReactionMessageRepository.Get(x => x.idUser == new Guid(myId) && x.idMessage == findMessage.id);
			if (reactionMessage == null)
			{
				var newReactionMessage = new ReactionMessage()
				{
					idUser = new Guid(myId),
					idMessage = findMessage.id,
					reaction = reactionDto.reaction
				};
				_unitOfWork.ReactionMessageRepository.Add(newReactionMessage);
				_unitOfWork.Save();
			}
			else
			{
				if (reactionMessage.reaction == reactionDto.reaction)
				{
					_unitOfWork.ReactionMessageRepository.Remove(reactionMessage);
					_unitOfWork.Save();
				}
				else
				{
					reactionMessage.reaction = reactionDto.reaction;
					_unitOfWork.Save();
				}
			}
			return Ok();
		}
		catch (Exception ex)
		{
			return BadRequest();
		}
	}

	// [HttpPost]
	// [Route("reply-message")]
	// public IActionResult ReplyMessage([FromBody]) {
	// 	try{

	// 	}
	// 	catch(Exception ex){

	// 	}
	// }
}