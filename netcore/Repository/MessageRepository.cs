using _net.Models;
using _net.Repository.IRepository;
using DataAccess;
using Microsoft.EntityFrameworkCore;

namespace _net.Repository;
public class MessageRepository : Repository<Message>, IMessageRepository
{
    private readonly ApplicationDbContext _db;
    public MessageRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }

    public long GetMessagesLength(Guid chatId)
    {
        return _db.Messages.Where(x => x.idChat == chatId).Count();
    }

    public IEnumerable<Message> GetMoreMessage(Guid chatId, int skip = 1)
    {
        return _db.Messages.Where(x => x.idChat == chatId)
                    .Include(x => x.sender)
                    .Include(x => x.reactions).ThenInclude(x => x.user)
                    .OrderByDescending(x => x.createAt)
                    .Skip((skip - 1) * 25)
                    .Take(25)
                    .Reverse();
    }

    public IEnumerable<IGrouping<DateTime, Message>> GetMoreMessageOrderByTime(Guid chatId, int skip = 1)
    {
        return _db.Messages.Where(x => x.idChat == chatId)
                    .OrderByDescending(x => x.createAt)
                    .Skip((skip - 1) * 25)
                    .Take(25)
                    .Reverse()
                    .GroupBy(x => x.createAt);

    }
}