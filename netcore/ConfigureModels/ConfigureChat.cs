using _net.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _net.ConfigureModels;
public class ConfigureChat : IEntityTypeConfiguration<Chat>
{
    public void Configure(EntityTypeBuilder<Chat> builder)
    {
        builder.HasKey(x => x.id);
        builder.HasOne(x => x.admin)
            .WithMany()
            .HasForeignKey(x => x.idAdmin);
        builder.HasOne(x => x.lastMessage)
                .WithOne(x => x.messageLastChat)
                .HasForeignKey<Chat>(x => x.idLastMessage);
    }
}