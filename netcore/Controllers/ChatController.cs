using System.Numerics;
using _net.dtos;
using _net.Models;
using _net.Repository.IRepository;
using DataAccess;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace _net.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ChatController : ControllerBase
{
	private readonly IUnitOfWork _unitOfWork;
	public ChatController(IUnitOfWork unitOfWork)
	{
		_unitOfWork = unitOfWork;
	}

	[HttpGet]
	[Route("get-chat")]
	public IActionResult GetChatOne([FromQuery] Guid id)
	{
		try
		{
			var myId = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
			var me = _unitOfWork.UserRepository.Get(u => u.id == new Guid(myId));
			var chat = _unitOfWork.ChatRepository.Get(x => x.isGroup == false
				&& x.memberChats.Count == 2
				&& x.memberChats.Any(m => m.idUser == id)
				&& x.memberChats.Any(m => m.idUser == me.id)
			);
			if (chat == null) return NotFound();
			return Ok(new
			{
				chatId = chat.id
			});

		}
		catch (Exception ex)
		{
			return BadRequest();
		}
	}

	[HttpGet]
	[Route("get-chat-by-id")]
	public IActionResult GetChatById([FromQuery] Guid id, [FromQuery] int skip = 1)
	{
		try
		{
			var chat = _unitOfWork.ChatRepository.Get(x => x.id == id, "memberChats,messages,memberChats.user,messages.replyMessage");
			if (chat == null)
			{
				return Ok(new
				{
					messages = new List<Message>(),
					length = 0
				});
			}
			var messages = _unitOfWork.MessageRepository.GetMoreMessage(chat.id, skip);
			return Ok(new
			{
				id = chat.id,
				image = chat.image,
				name = chat.name,
				isGroup = chat.isGroup,
				memberChats = chat.memberChats,
				messages = messages,
				idLastMessage = chat.idLastMessage
			});
		}
		catch (Exception ex)
		{
			return BadRequest();
		}
	}


	[HttpPost]
	[Route("get-detail-chat")]
	public IActionResult GetChat([FromBody] ExceptUser exceptUser, [FromQuery] int skip = 1)
	{
		try
		{

			if (exceptUser.exceptIds == null) return NotFound();
			var myId = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
			exceptUser.exceptIds.Add(new Guid(myId));
			var newIds = exceptUser.exceptIds.Distinct();
			if (!newIds.Any()) return NotFound();
			var chat = _unitOfWork.ChatRepository.Get(x =>
				x.memberChats.Count() == newIds.Count()
				&& x.memberChats.All(m => newIds.Contains(m.idUser))
			);
			if (chat == null)
			{
				return Ok(new
				{
					message = "Not found this conversation"
				});
			}
			var messages = _unitOfWork.MessageRepository.GetMoreMessage(chat.id, skip);
			return Ok(new
			{
				messages = messages,
				length = messages.Count()
			});
		}
		catch (Exception ex)
		{
			return BadRequest();
		}
	}

	[HttpGet]
	[Route("get-all-chat")]
	public IActionResult GetAllChat()
	{
		try
		{
			var myId = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
			var me = _unitOfWork.UserRepository.Get(u => u.id == new Guid(myId));
			IEnumerable<Chat> chats = _unitOfWork.ChatRepository.GetAll(x => x.memberChats.Any(m => m.idUser == me.id), "lastMessage,memberChats,memberChats.user").OrderByDescending(x => x.lastMessage.createAt);
			return Ok(new
			{
				chats = chats
			});

		}
		catch (Exception ex)
		{
			return BadRequest();
		}
	}

	[HttpGet]
	[Route("get-all-message")]
	public IActionResult GetAllMessageChatOne([FromQuery] Guid id, [FromQuery] int skip = 1)
	{
		try
		{
			var checkExistUser = _unitOfWork.UserRepository.Get(u => u.id == id);
			string myId = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
			var me = _unitOfWork.UserRepository.Get(u => u.id == new Guid(myId));
			if (checkExistUser == null || me == null)
			{
				return NotFound(new
				{
					message = "Not found this conversation"
				});
			}
			var chat = _unitOfWork.ChatRepository.Get(x =>
			x.isGroup == false
			&& x.memberChats.Count == 2
			&& x.memberChats.Any(m => m.idUser == me.id)
			&& x.memberChats.Any(m => m.idUser == checkExistUser.id));
			if (chat == null)
			{
				return Ok(new
				{
					message = "Not found this conversation"
				});
			}
			var messages = _unitOfWork.MessageRepository.GetMoreMessage(chat.id, skip);
			return Ok(new
			{
				messages = messages,
				length = messages.Count()
			});
		}
		catch (Exception ex)
		{
			return BadRequest();
		}

	}


	// [HttpPost]
	// [Route("create-chat-one")]
	// public IActionResult CreateChat([FromForm] CreateChatOneDto createChatOneDto)
	// {
	// 	try
	// 	{
	// 		using var transaction = _unitOfWork.Context.Database.BeginTransaction();
	// 		var checkExistUser = _unitOfWork.UserRepository.Get(u => u.id == createChatOneDto.memberId);
	// 		string myId = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
	// 		var me = _unitOfWork.UserRepository.Get(u => u.id == new Guid(myId));
	// 		if (checkExistUser == null || me == null)
	// 		{
	// 			throw new InvalidOperationException($"User with id {createChatOneDto.memberId} does not exist.");
	// 		}
	// 		var chat = _unitOfWork.ChatRepository.Get(x =>
	// 						x.isGroup == false
	// 						&& x.memberChats.Count == 2
	// 						&& x.memberChats.Any(m => m.idUser == me.id)
	// 						&& x.memberChats.Any(m => m.idUser == checkExistUser.id),
	// 						"admin,messages,memberChats,lastMessage");
	// 		var message = new Message()
	// 		{
	// 			content = createChatOneDto.content,
	// 			sender = me,
	// 			type = createChatOneDto.type,
	// 		};
	// 		_unitOfWork.MessageRepository.Add(message);
	// 		if (chat == null)
	// 		{
	// 			chat = new Chat()
	// 			{
	// 				name = checkExistUser.name,
	// 				isGroup = false,
	// 				memberChats = new List<MemberChat>
	// 					{
	// 							new MemberChat() { user = me},
	// 							new MemberChat() { user = checkExistUser},
	// 					},
	// 				messages = new List<Message>(),
	// 			};
	// 			_unitOfWork.ChatRepository.Add(chat);
	// 			message.idChat = chat.id;
	// 			_unitOfWork.Save();
	// 			chat.idLastMessage = message.id;
	// 			_unitOfWork.Save();
	// 			transaction.Commit();
	// 			return Ok(new
	// 			{
	// 				isNewChat = true,
	// 				message = message,
	// 				messageId = message.id,
	// 				chatId = chat.id,
	// 				memberChats = chat.memberChats
	// 			});
	// 		}
	// 		chat.messages.Add(message);
	// 		chat.lastMessage = message;
	// 		_unitOfWork.Save();
	// 		transaction.Commit();
	// 		return Ok(new
	// 		{
	// 			message = message,
	// 			messageId = message.id,
	// 			chatId = chat.id
	// 		});
	// 	}
	// 	catch (Exception ex)
	// 	{
	// 		return BadRequest();
	// 	}
	// }


	[HttpPost]
	[Route("send-message-new-chat")]
	public IActionResult SendMessageNewChat([FromForm] SendMessageDto sendMessageDto)
	{
		try
		{
			var myId = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
			var me = _unitOfWork.UserRepository.Get(u => u.id == new Guid(myId));
			sendMessageDto.memberIds.Add(new Guid(myId));
			var newIds = sendMessageDto.memberIds.Distinct();
			var chat = _unitOfWork.ChatRepository.Get(x =>
				x.memberChats.Count() == newIds.Count()
				&& x.memberChats.All(m => newIds.Contains(m.idUser))
				, "admin,messages,memberChats,lastMessage"
			);
			var message = new Message()
			{
				content = sendMessageDto.content,
				idSender = new Guid(myId),
				type = sendMessageDto.type,
			};
			using var transaction = _unitOfWork.Context.Database.BeginTransaction();
			if (chat == null)
			{
				const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
				Random random = new Random();
				string randomString = new string(Enumerable.Repeat(chars, 6)
					.Select(s => s[random.Next(s.Length)]).ToArray());
				chat = new Chat()
				{
					isGroup = newIds.Count() > 2,
					name = newIds.Count() > 2 ? randomString : "",
					memberChats = newIds.Select(id => new MemberChat() { idUser = id }).ToList(),
					messages = new List<Message>(),
				};
				_unitOfWork.ChatRepository.Add(chat);
				_unitOfWork.Save();
			}
			chat.messages.Add(message);
			chat.lastMessage = message;
			var replyMessage = _unitOfWork.MessageRepository.Get(x => x.id == sendMessageDto.idReplyMessage);
			if (replyMessage == null || replyMessage.idChat != chat.id)
			{

			}
			else message.replyMessage = replyMessage;
			_unitOfWork.Save();
			transaction.Commit();
			message.sender = me;
			return Ok(new
			{
				message = message,
				messageId = message.id,
				chatId = chat.id
			});
		}
		catch (Exception ex)
		{
			var sqlException = ex as SqlException;
			return BadRequest();
		}
	}


	[HttpPost]
	[Route("get-message-by-ids")]
	public IActionResult GetAllMessage([FromBody] ExceptUser exceptUser, [FromQuery] int skip = 1)
	{
		try
		{
			string myId = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
			exceptUser.exceptIds.Add(new Guid(myId));
			var newIds = exceptUser.exceptIds.Distinct();
			var chat = _unitOfWork.ChatRepository.Get(x =>
				x.memberChats.Count() == newIds.Count()
				&& x.memberChats.All(m => newIds.Contains(m.idUser))
				, "admin,messages,memberChats,lastMessage"
			);
			if (chat == null)
			{
				return Ok(new
				{
					message = "Not found this conversation"
				});
			}
			var messages = _unitOfWork.MessageRepository.GetMoreMessage(chat.id, skip);
			return Ok(new
			{
				messages = messages,
				chat = chat
			});
		}
		catch (Exception ex)
		{
			return BadRequest();
		}

	}

	[HttpPost]
	[Route("send-message")]
	public IActionResult SendMessageChatExist([FromForm] SendMessageExistsDto sendMessageDto)
	{
		try
		{
			string myId = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
			var me = _unitOfWork.UserRepository.Get(u => u.id == new Guid(myId));
			using var transaction = _unitOfWork.Context.Database.BeginTransaction();
			var chat = _unitOfWork.ChatRepository.Get(x => x.id == sendMessageDto.chatId, "messages,lastMessage");
			var message = new Message()
			{
				content = sendMessageDto.content,
				idSender = new Guid(myId),
				type = sendMessageDto.type,
			};
			chat.messages.Add(message);
			chat.lastMessage = message;
			var replyMessage = _unitOfWork.MessageRepository.Get(x => x.id == sendMessageDto.idReplyMessage, "sender");
			if (replyMessage == null || replyMessage.idChat != chat.id)
			{
				message.replyMessage = null;
			}
			else message.replyMessage = replyMessage;
			_unitOfWork.Save();
			transaction.Commit();
			message.sender = me;
			return Ok(new
			{
				message = message,
				messageId = message.id,
				chatId = chat.id
			});
		}
		catch (Exception ex)
		{
			return BadRequest();
		}
	}

	[HttpGet]
	[Route("check-user-in-group")]
	public IActionResult CheckUserInGroup([FromQuery] Guid chatId)
	{
		try
		{
			string myId = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
			var me = _unitOfWork.UserRepository.Get(x => x.id == new Guid(myId));
			var check = _unitOfWork.MemberChatRepository.CheckUserInGroup(chatId, me.id);
			if (check)
			{
				var memberChats = _unitOfWork.MemberChatRepository.GetAll(x => x.idChat == chatId && x.idUser != me.id).Select(x => x.idUser);
				return Ok(new
				{
					isInGroup = true,
					memberChats = memberChats
				});
			}
			return NotFound(new
			{
				isInGroup = false
			});
		}
		catch (Exception ex)
		{
			return BadRequest();
		}

	}
}