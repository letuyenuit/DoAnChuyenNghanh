using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace net.Migrations
{
    /// <inheritdoc />
    public partial class addavataruser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "avartar",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "avartar",
                table: "Users");
        }
    }
}
