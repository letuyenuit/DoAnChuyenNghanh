using DataAccess;

namespace _net.Repository.IRepository;
public interface IUnitOfWork
{
    IUserRepository UserRepository { get; }
    IChatRepository ChatRepository { get; }

    IMessageRepository MessageRepository { get; }

    IMemberChatRepository MemberChatRepository { get; }
    IReactionMessageRepository ReactionMessageRepository { get; }
    ApplicationDbContext Context { get; }


    void Save();
}