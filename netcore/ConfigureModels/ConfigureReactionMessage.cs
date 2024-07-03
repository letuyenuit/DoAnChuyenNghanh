using _net.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _net.ConfigureModels;
public class ConfigureReactionMessage : IEntityTypeConfiguration<ReactionMessage>
{
    public void Configure(EntityTypeBuilder<ReactionMessage> builder)
    {
        builder.HasKey(x => new { x.idUser, x.idMessage });
        builder.HasOne(x => x.user)
            .WithMany()
            .HasForeignKey(x => x.idUser)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.message)
            .WithMany(x => x.reactions)
            .HasForeignKey(x => x.idMessage)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
