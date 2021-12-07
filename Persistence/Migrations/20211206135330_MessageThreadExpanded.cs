using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class MessageThreadExpanded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "InitDeleted",
                table: "MessageThreads",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "InitUsername",
                table: "MessageThreads",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ReceiverDeleted",
                table: "MessageThreads",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ReceiverUsername",
                table: "MessageThreads",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InitDeleted",
                table: "MessageThreads");

            migrationBuilder.DropColumn(
                name: "InitUsername",
                table: "MessageThreads");

            migrationBuilder.DropColumn(
                name: "ReceiverDeleted",
                table: "MessageThreads");

            migrationBuilder.DropColumn(
                name: "ReceiverUsername",
                table: "MessageThreads");
        }
    }
}
