using _net.Models;
using _net.Repository.IRepository;
using DataAccess;

namespace _net.Repository;
public class UserRepository : Repository<User>, IUserRepository
{
    private readonly ApplicationDbContext _db;
    public UserRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }
}