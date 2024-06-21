using _net.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _net.ConfigureModels;
public class ConfigureMemberChat : IEntityTypeConfiguration<MemberChat>
{
    public void Configure(EntityTypeBuilder<MemberChat> builder)
    {
        builder.HasKey(x => new { x.idChat, x.idUser });
        builder.HasOne(x => x.user)
            .WithMany(x => x.groupMembers)
            .HasForeignKey(x => x.idUser);
        builder.HasOne(x => x.chat)
            .WithMany(x => x.memberChats)
            .HasForeignKey(x => x.idChat);
    }
}