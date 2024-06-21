using _net.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _net.ConfigureModels;
public class ConfigureMessage : IEntityTypeConfiguration<Message>
{
    public void Configure(EntityTypeBuilder<Message> builder)
    {
        builder.HasKey(x => x.id);
        builder.HasOne(x => x.sender)
            .WithMany()
            .HasForeignKey(x => x.idSender);
        builder.HasOne(x => x.chat)
            .WithMany(x => x.messages)
            .HasForeignKey(x => x.idChat);
        builder.HasOne(x => x.replyMessage)
            .WithMany()
            .HasForeignKey(x => x.idReplyMessage);
    }
}