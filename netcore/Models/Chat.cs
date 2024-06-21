using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace _net.Models;
public class Chat
{

    public Guid id { get; set; }

    public string image { get; set; } = "https://res.cloudinary.com/dalz888e7/image/upload/v1715605579/Pngtree_user_group_307404_kiy9nf.png";
    public string? name { get; set; }
    public bool isGroup { get; set; } = false;

    public Guid? idAdmin { get; set; }

    [ValidateNever]
    [NotMapped]
    public User admin { get; set; }

    [ValidateNever]
    [NotMapped]
    public List<Message> messages { get; set; }

    [ValidateNever]
    [NotMapped]
    public List<MemberChat> memberChats { get; set; }

    public Guid? idLastMessage { get; set; }

    [ValidateNever]
    [NotMapped]
    public Message lastMessage { get; set; }
    public DateTime CreateAt { get; set; } = DateTime.Now;
    public DateTime? UpdateAt { get; set; }
}