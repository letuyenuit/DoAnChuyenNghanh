using _net.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _net.ConfigureModels;
public class ConfigureMessageFile : IEntityTypeConfiguration<MessageFile>
{
    public void Configure(EntityTypeBuilder<MessageFile> builder)
    {
        builder.HasKey(x => x.id);
        builder.HasOne(x => x.message)
            .WithMany()
            .HasForeignKey(x => x.idMessage);
    }
}