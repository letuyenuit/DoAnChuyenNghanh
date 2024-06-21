namespace _net.dtos;
public class CreateChatDto
{
    public List<Guid> memberIds { get; set; }
    public string content { get; set; }

}


public class CreateChatOneDto
{
    public Guid memberId { get; set; }
    public string content { get; set; }
    public string type { get; set; }

}

public class SendMessageExistsDto
{
    public Guid chatId { get; set; }
    public string content { get; set; }
    public string type { get; set; }


    public Guid? idReplyMessage { get; set; }
}

public class SendMessageDto
{
    public List<Guid> memberIds { get; set; }
    public string content { get; set; }
    public string type { get; set; }

    public Guid? idReplyMessage { get; set; }

}




// namespace _net.dtos;
// public class CreateChatDto
// {
//     public List<Guid> memberIds { get; set; }
//     public string content { get; set; }

// }


// public class CreateChatOneDto
// {
//     public Guid memberId { get; set; }
//     public string content { get; set; }
//     public string type { get; set; }

// }

// public class SendMessageExistsDto
// {
//     // public Guid chatId { get; set; }
//     public string content { get; set; }
//     public string type { get; set; }
//     public Guid? idReplyMessage { get; set; }
// }

// public class SendMultipleMessageExistsDto
// {
//     public Guid chatId { get; set; }
//     public List<SendMessageExistsDto> messages { get; set; }
// }



// public class SendMessageDto
// {
//     // public List<Guid> memberIds { get; set; }
//     public string content { get; set; }
//     public string type { get; set; }
//     public Guid? idReplyMessage { get; set; }
// }

// public class SendMultipleMessageDto
// {
//     public List<Guid> memberIds { get; set; }
//     public List<SendMessageDto> messages { get; set; }
// }