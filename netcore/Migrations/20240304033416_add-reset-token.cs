using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace net.Migrations
{
    /// <inheritdoc />
    public partial class addresettoken : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "resetTokenAt",
                table: "Users",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "tokenResetPassword",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "resetTokenAt",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "tokenResetPassword",
                table: "Users");
        }
    }
}
