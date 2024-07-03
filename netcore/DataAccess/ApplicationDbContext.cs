using Microsoft.EntityFrameworkCore;
using _net.Models;
using _net.ConfigureModels;

namespace DataAccess;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {

    }

    public DbSet<User> Users { get; set; }
    public DbSet<Chat> Chats { get; set; }
    public DbSet<MemberChat> MemberChats { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<MessageFile> MessageFiles { get; set; }

    public DbSet<ReactionMessage> ReactionMessages { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        new ConfigureUser().Configure(builder.Entity<User>());
        new ConfigureChat().Configure(builder.Entity<Chat>());
        new ConfigureMemberChat().Configure(builder.Entity<MemberChat>());
        new ConfigureMessage().Configure(builder.Entity<Message>());
        new ConfigureMessageFile().Configure(builder.Entity<MessageFile>());
        new ConfigureReactionMessage().Configure(builder.Entity<ReactionMessage>());
    }
}