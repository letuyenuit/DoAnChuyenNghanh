using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace _net.Models;
public class MemberChat
{
    public Guid idChat { get; set; }

    [ValidateNever]
    [NotMapped]
    public Chat chat { get; set; }
    public Guid idUser { get; set; }

    [ValidateNever]
    [NotMapped]
    public User user { get; set; }
}