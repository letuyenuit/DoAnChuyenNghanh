using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace net.Migrations
{
    /// <inheritdoc />
    public partial class deletehubdata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Connections");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Connections",
                columns: table => new
                {
                    idConnection = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    idUser = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    isConnected = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Connections", x => x.idConnection);
                    table.ForeignKey(
                        name: "FK_Connections_Users_idUser",
                        column: x => x.idUser,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Connections_idUser",
                table: "Connections",
                column: "idUser");
        }
    }
}
