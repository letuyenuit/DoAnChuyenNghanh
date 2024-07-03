using _net.Models;
using _net.Repository.IRepository;
using DataAccess;
using Microsoft.EntityFrameworkCore;

namespace _net.Repository;
public class MemberChatRepository : Repository<MemberChat>, IMemberChatRepository
{
    private readonly ApplicationDbContext _db;
    public MemberChatRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }

    public IEnumerable<MemberChat> AddMultiple(IEnumerable<User> users, Chat chat)
    {
        var memberChats = new List<MemberChat>();
        foreach (var user in users)
        {
            var memberChat = new MemberChat
            {
                user = user,
                chat = chat
            };
            memberChats.Add(memberChat);
        }
        return memberChats;
    }

    public bool CheckUserInGroup(Guid chatId, Guid userId)
    {
        var checkMember = _db.MemberChats.Where(x => x.idChat == chatId && x.idUser == userId).FirstOrDefault();
        if (checkMember == null)
        {
            return false;
        }
        return true;

    }
}