using _net.Repository.IRepository;
using DataAccess;

namespace _net.Repository;
public class UnitOfWork : IUnitOfWork
{
    private ApplicationDbContext _db;

    public IUserRepository UserRepository { get; set; }
    public IChatRepository ChatRepository { get; set; }

    public IMessageRepository MessageRepository { get; set; }

    public ApplicationDbContext Context { get; }

    public IMemberChatRepository MemberChatRepository { get; set; }

    public IReactionMessageRepository ReactionMessageRepository { get; set; }

    public UnitOfWork(ApplicationDbContext db)
    {
        _db = db;
        UserRepository = new UserRepository(_db);
        ChatRepository = new ChatRepository(_db);
        MessageRepository = new MessageRepository(_db);
        MemberChatRepository = new MemberChatRepository(_db);
        ReactionMessageRepository = new ReactionMessageRepository(_db);
        Context = _db;
    }

    public void Save()
    {
        _db.SaveChanges();
    }
}