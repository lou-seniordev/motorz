using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class ExtendDiaryEntry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberOfKilometers",
                table: "DiaryEntries",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Road",
                table: "DiaryEntries",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Weather",
                table: "DiaryEntries",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfKilometers",
                table: "DiaryEntries");

            migrationBuilder.DropColumn(
                name: "Road",
                table: "DiaryEntries");

            migrationBuilder.DropColumn(
                name: "Weather",
                table: "DiaryEntries");
        }
    }
}
