using _net.Models;
using _net.Repository.IRepository;
using DataAccess;

namespace _net.Repository;
public class ChatRepository : Repository<Chat>, IChatRepository
{
    private readonly ApplicationDbContext _db;
    public ChatRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }

    public IEnumerable<Chat> GetAllChat(User me)
    {
        var chats = _db.Messages.Where(x => x.idSender == me.id).Select(x => x.chat).Distinct();
        return chats;
    }

    public IEnumerable<Chat> GetAllChatDesc(User me)
    {
        var chats = _db.Messages.Where(x => x.idSender == me.id).Select(x => x.chat).Distinct().OrderByDescending(x => x.CreateAt);
        return chats;
    }
}