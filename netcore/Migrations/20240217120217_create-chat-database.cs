using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace net.Migrations
{
    /// <inheritdoc />
    public partial class createchatdatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "Users",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "Chats",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    isGroup = table.Column<bool>(type: "bit", nullable: false),
                    idAdmin = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    idLastMessage = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chats", x => x.id);
                    table.ForeignKey(
                        name: "FK_Chats_Users_idAdmin",
                        column: x => x.idAdmin,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "MemberChats",
                columns: table => new
                {
                    idChat = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    idUser = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Chatid = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MemberChats", x => new { x.idChat, x.idUser });
                    table.ForeignKey(
                        name: "FK_MemberChats_Chats_Chatid",
                        column: x => x.Chatid,
                        principalTable: "Chats",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_MemberChats_Chats_idChat",
                        column: x => x.idChat,
                        principalTable: "Chats",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MemberChats_Users_idUser",
                        column: x => x.idUser,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    idSender = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    idChat = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    createAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    idReplyMessage = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.id);
                    table.ForeignKey(
                        name: "FK_Messages_Chats_idChat",
                        column: x => x.idChat,
                        principalTable: "Chats",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Messages_Messages_idReplyMessage",
                        column: x => x.idReplyMessage,
                        principalTable: "Messages",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Messages_Users_idSender",
                        column: x => x.idSender,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MessageFiles",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    idMessage = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Messageid = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessageFiles", x => x.id);
                    table.ForeignKey(
                        name: "FK_MessageFiles_Messages_Messageid",
                        column: x => x.Messageid,
                        principalTable: "Messages",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_MessageFiles_Messages_idMessage",
                        column: x => x.idMessage,
                        principalTable: "Messages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_email",
                table: "Users",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Chats_idAdmin",
                table: "Chats",
                column: "idAdmin");

            migrationBuilder.CreateIndex(
                name: "IX_Chats_idLastMessage",
                table: "Chats",
                column: "idLastMessage");

            migrationBuilder.CreateIndex(
                name: "IX_MemberChats_Chatid",
                table: "MemberChats",
                column: "Chatid");

            migrationBuilder.CreateIndex(
                name: "IX_MemberChats_idUser",
                table: "MemberChats",
                column: "idUser");

            migrationBuilder.CreateIndex(
                name: "IX_MessageFiles_idMessage",
                table: "MessageFiles",
                column: "idMessage");

            migrationBuilder.CreateIndex(
                name: "IX_MessageFiles_Messageid",
                table: "MessageFiles",
                column: "Messageid");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_idChat",
                table: "Messages",
                column: "idChat");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_idReplyMessage",
                table: "Messages",
                column: "idReplyMessage");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_idSender",
                table: "Messages",
                column: "idSender");

            migrationBuilder.AddForeignKey(
                name: "FK_Chats_Messages_idLastMessage",
                table: "Chats",
                column: "idLastMessage",
                principalTable: "Messages",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chats_Messages_idLastMessage",
                table: "Chats");

            migrationBuilder.DropTable(
                name: "MemberChats");

            migrationBuilder.DropTable(
                name: "MessageFiles");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "Chats");

            migrationBuilder.DropIndex(
                name: "IX_Users_email",
                table: "Users");

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
