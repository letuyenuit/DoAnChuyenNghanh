using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace net.Migrations
{
    /// <inheritdoc />
    public partial class updaterelationone : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Chats_idLastMessage",
                table: "Chats");

            migrationBuilder.CreateIndex(
                name: "IX_Chats_idLastMessage",
                table: "Chats",
                column: "idLastMessage",
                unique: true,
                filter: "[idLastMessage] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Chats_idLastMessage",
                table: "Chats");

            migrationBuilder.CreateIndex(
                name: "IX_Chats_idLastMessage",
                table: "Chats",
                column: "idLastMessage");
        }
    }
}
