using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace _net.Models
{
    public class User
    {
        public Guid id { get; set; }
        public string avartar { get; set; } = "https://res.cloudinary.com/dalz888e7/image/upload/v1694008849/my_image_user/preview2.jpg";
        public string name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public DateTime createAt { get; set; } = DateTime.Now;

        [ValidateNever]
        [NotMapped]
        public List<MemberChat> groupMembers { get; set; }

        public DateTime? resetTokenAt { get; set; }
        public string? tokenResetPassword { get; set; }

    }
}