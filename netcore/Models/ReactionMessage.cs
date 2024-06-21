using System.ComponentModel.DataAnnotations.Schema;

namespace _net.Models;
public class ReactionMessage
{
    public Guid idMessage { get; set; }

    [NotMapped]
    public Message message { get; set; }

    public Guid idUser { get; set; }

    [NotMapped]
    public User user { get; set; }

    public string reaction { get; set; }
}