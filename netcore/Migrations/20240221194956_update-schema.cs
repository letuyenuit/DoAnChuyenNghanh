using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace net.Migrations
{
    /// <inheritdoc />
    public partial class updateschema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MessageFiles_Messages_Messageid",
                table: "MessageFiles");

            migrationBuilder.DropIndex(
                name: "IX_MessageFiles_Messageid",
                table: "MessageFiles");

            migrationBuilder.DropColumn(
                name: "Messageid",
                table: "MessageFiles");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "Messageid",
                table: "MessageFiles",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MessageFiles_Messageid",
                table: "MessageFiles",
                column: "Messageid");

            migrationBuilder.AddForeignKey(
                name: "FK_MessageFiles_Messages_Messageid",
                table: "MessageFiles",
                column: "Messageid",
                principalTable: "Messages",
                principalColumn: "id");
        }
    }
}
