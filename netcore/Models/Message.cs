using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace _net.Models;
public class Message
{
    public Guid id { get; set; }
    public string content { get; set; }

    public string type { get; set; }

    [ValidateNever]
    [NotMapped]
    public List<MessageFile> files { get; set; }
    public Guid idSender { get; set; }

    [ValidateNever]
    [NotMapped]
    public User sender { get; set; }
    public Guid idChat { get; set; }

    [ValidateNever]
    [NotMapped]
    public Chat chat { get; set; }
    public DateTime createAt { get; set; } = DateTime.Now;
    public Guid? idReplyMessage { get; set; }

    [ValidateNever]
    [NotMapped]
    public Message replyMessage { get; set; }

    [NotMapped]
    public Chat messageLastChat { get; set; }

    public List<ReactionMessage> reactions { get; set; }
}
