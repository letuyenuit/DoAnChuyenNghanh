using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace net.Migrations
{
    /// <inheritdoc />
    public partial class addtablereactionmessage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ReactionMessages",
                columns: table => new
                {
                    idMessage = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    idUser = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    reaction = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReactionMessages", x => new { x.idUser, x.idMessage });
                    table.ForeignKey(
                        name: "FK_ReactionMessages_Messages_idMessage",
                        column: x => x.idMessage,
                        principalTable: "Messages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReactionMessages_Users_idUser",
                        column: x => x.idUser,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReactionMessages_idMessage",
                table: "ReactionMessages",
                column: "idMessage");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReactionMessages");
        }
    }
}
