using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace net.Migrations
{
    /// <inheritdoc />
    public partial class updaterelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MemberChats_Chats_Chatid",
                table: "MemberChats");

            migrationBuilder.DropIndex(
                name: "IX_MemberChats_Chatid",
                table: "MemberChats");

            migrationBuilder.DropColumn(
                name: "Chatid",
                table: "MemberChats");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "Chatid",
                table: "MemberChats",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MemberChats_Chatid",
                table: "MemberChats",
                column: "Chatid");

            migrationBuilder.AddForeignKey(
                name: "FK_MemberChats_Chats_Chatid",
                table: "MemberChats",
                column: "Chatid",
                principalTable: "Chats",
                principalColumn: "id");
        }
    }
}
