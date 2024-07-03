using _net.Models;

namespace _net.Repository.IRepository;
public interface IMessageRepository : IRepository<Message>
{
    IEnumerable<Message> GetMoreMessage(Guid chatId, int skip = 1);
    IEnumerable<IGrouping<DateTime, Message>> GetMoreMessageOrderByTime(Guid chatId, int skip = 1);
    long GetMessagesLength(Guid chatId);
}