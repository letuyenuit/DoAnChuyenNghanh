using _net.Models;
using _net.Repository.IRepository;
using DataAccess;

namespace _net.Repository;
public class ReactionMessageRepository : Repository<ReactionMessage>, IReactionMessageRepository
{
    public ReactionMessageRepository(ApplicationDbContext db) : base(db)
    {
    }
}