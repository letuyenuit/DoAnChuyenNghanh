using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace _net.Models;
public class MessageFile
{
    public Guid id { get; set; }
    public string type { get; set; }
    public string url { get; set; }
    public Guid idMessage { get; set; }

    [ValidateNever]
    [NotMapped]
    public Message message { get; set; }
}