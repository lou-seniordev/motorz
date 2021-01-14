using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UserMotofyAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserMotofies",
                columns: table => new
                {
                    AppUserId = table.Column<string>(nullable: false),
                    MotofyId = table.Column<Guid>(nullable: false),
                    DateEmbraced = table.Column<DateTime>(nullable: false),
                    IsOwner = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMotofies", x => new { x.AppUserId, x.MotofyId });
                    table.ForeignKey(
                        name: "FK_UserMotofies_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserMotofies_Motofies_MotofyId",
                        column: x => x.MotofyId,
                        principalTable: "Motofies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserMotofies_MotofyId",
                table: "UserMotofies",
                column: "MotofyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserMotofies");
        }
    }
}
