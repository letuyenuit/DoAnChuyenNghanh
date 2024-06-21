using _net.Models;

namespace _net.Repository.IRepository;
public interface IChatRepository : IRepository<Chat>
{
    IEnumerable<Chat> GetAllChat(User me);
    IEnumerable<Chat> GetAllChatDesc(User me);

}