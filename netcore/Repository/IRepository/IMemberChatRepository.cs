using _net.Models;

namespace _net.Repository.IRepository;
public interface IMemberChatRepository : IRepository<MemberChat>
{
    IEnumerable<MemberChat> AddMultiple(IEnumerable<User> users, Chat chat);
    bool CheckUserInGroup(Guid chatId, Guid userId);
}